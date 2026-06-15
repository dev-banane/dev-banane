const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstileToken(
  token: string,
  secret: string,
  remoteip?: string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  if (!secret) {
    return { success: false, errorCodes: ['missing-secret'] };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteip) body.set('remoteip', remoteip);

  const res = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    return { success: false, errorCodes: ['service-unavailable'] };
  }

  const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
  return {
    success: data.success,
    errorCodes: data['error-codes'],
  };
}
