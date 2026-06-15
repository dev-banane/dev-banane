const MODEL = '@cf/meta/llama-guard-3-8b';
const MAX_INPUT_CHARS = 600;

export type ModerationConfig = {
  accountId?: string;
  apiToken?: string;
};

type ModerationResult = {
  allowed: boolean;
  degraded?: boolean;
};

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

export async function moderateText(
  config: ModerationConfig,
  text: string
): Promise<ModerationResult> {
  const { accountId, apiToken } = config;

  if (!accountId || !apiToken) {
    return { allowed: true, degraded: true };
  }

  const input = text.slice(0, MAX_INPUT_CHARS);
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: input }],
        max_tokens: 16,
        temperature: 0,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error('[moderation] API error:', res.status, await res.text().catch(() => ''));
      return { allowed: true, degraded: true };
    }

    const data = (await res.json()) as {
      success?: boolean;
      result?: { response?: unknown };
    };

    if (data.success === false) {
      return { allowed: true, degraded: true };
    }

    const verdict = parseVerdict(data?.result?.response);
    if (verdict === 'unsafe') return { allowed: false };
    if (verdict === 'safe') return { allowed: true };
    return { allowed: true, degraded: true };
  } catch (err) {
    console.error('[moderation] request failed:', err);
    return { allowed: true, degraded: true };
  }
}
