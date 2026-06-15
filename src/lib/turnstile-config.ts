type TurnstileEnv = {
  DISABLE_TURNSTILE?: string;
  TURNSTILE_SECRET_KEY?: string;
};

export function isTruthyFlag(value: string | undefined): boolean {
  return value === 'true' || value === '1';
}

export function isTurnstileEnabled(env: TurnstileEnv): boolean {
  if (isTruthyFlag(env.DISABLE_TURNSTILE)) return false;
  return Boolean(env.TURNSTILE_SECRET_KEY);
}
