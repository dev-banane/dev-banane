import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';

const MODEL = '@cf/meta/llama-guard-3-8b';
const MAX_INPUT_CHARS = 600;

const profanityMatcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

export type ModerationEnv = {
  DISABLE_MODERATION?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_AI_TOKEN?: string;
  AI?: Ai;
};

export type ModerationResult = {
  allowed: boolean;
  degraded?: boolean;
};

function isTruthyFlag(value: string | undefined): boolean {
  return value === 'true' || value === '1';
}

export function isModerationEnabled(env: ModerationEnv): boolean {
  return !isTruthyFlag(env.DISABLE_MODERATION);
}

function containsProfanity(text: string): boolean {
  return profanityMatcher.hasMatch(text);
}

function parseVerdict(raw: unknown): 'safe' | 'unsafe' | 'unknown' {
  const text =
    typeof raw === 'string'
      ? raw
      : typeof raw === 'object' && raw && 'response' in raw
        ? String((raw as { response?: unknown }).response ?? '')
        : String(raw ?? '');

  const first = text.trim().split(/\r?\n/)[0]?.trim().toLowerCase() ?? '';
  if (first === 'safe') return 'safe';
  if (first === 'unsafe' || first.startsWith('unsafe')) return 'unsafe';
  if (text.toLowerCase().includes('unsafe')) return 'unsafe';
  if (text.toLowerCase().includes('safe')) return 'safe';
  return 'unknown';
}

function extractResponse(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data;
  const record = data as { response?: unknown; result?: { response?: unknown } };
  if (record.response !== undefined) return record.response;
  return record.result?.response;
}

async function runLlamaGuard(
  input: string,
  env: ModerationEnv
): Promise<{ response: unknown; degraded: boolean }> {
  const messages = [{ role: 'user' as const, content: input }];
  const options = { messages, max_tokens: 16, temperature: 0 };

  if (env.AI) {
    const data = await env.AI.run(MODEL, options);
    return { response: extractResponse(data), degraded: false };
  }

  const { accountId, apiToken } = {
    accountId: env.CLOUDFLARE_ACCOUNT_ID?.trim(),
    apiToken: env.CLOUDFLARE_AI_TOKEN?.trim(),
  };
  if (!accountId || !apiToken) {
    return { response: null, degraded: true };
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    console.error('[moderation] API error:', res.status, await res.text().catch(() => ''));
    return { response: null, degraded: true };
  }

  const data = (await res.json()) as { success?: boolean; result?: { response?: unknown } };
  if (data.success === false) {
    return { response: null, degraded: true };
  }

  return { response: extractResponse(data), degraded: false };
}

export async function moderateText(env: ModerationEnv, text: string): Promise<ModerationResult> {
  if (containsProfanity(text)) {
    return { allowed: false };
  }

  const input = text.slice(0, MAX_INPUT_CHARS);

  try {
    const { response, degraded: transportDegraded } = await runLlamaGuard(input, env);
    if (transportDegraded || response == null) {
      console.error('[moderation] unavailable — rejecting comment');
      return { allowed: false, degraded: true };
    }

    const verdict = parseVerdict(response);
    if (verdict === 'unsafe') return { allowed: false };
    if (verdict === 'safe') return { allowed: true };

    console.error('[moderation] unknown verdict:', response);
    return { allowed: false, degraded: true };
  } catch (err) {
    console.error('[moderation] request failed:', err);
    return { allowed: false, degraded: true };
  }
}
