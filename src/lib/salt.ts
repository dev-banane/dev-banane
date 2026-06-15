import { isTruthyFlag } from './turnstile-config';

type SaltEnv = {
  COMMENTS_SALT?: string;
  DISABLE_TURNSTILE?: string;
};

export function getCommentsSalt(env: SaltEnv): string | null {
  const salt = env.COMMENTS_SALT?.trim();
  if (salt) return salt;
  if (isTruthyFlag(env.DISABLE_TURNSTILE)) return 'local-dev-only';
  return null;
}
