import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { uploadAvatar } from '../../lib/avatar';
import { isTurnstileEnabled } from '../../lib/turnstile-config';
import { verifyTurnstileToken } from '../../lib/turnstile';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const bucket = env.MEDIA;
    if (!bucket) {
      return Response.json({ error: 'Avatar uploads are not configured.' }, { status: 503 });
    }

    const form = await request.formData();
    const file = form.get('avatar');

    if (!(file instanceof File) || file.size === 0) {
      return Response.json({ error: 'Choose an image to upload.' }, { status: 400 });
    }

    if (isTurnstileEnabled(env)) {
      const turnstileToken = String(form.get('turnstileToken') ?? '');
      if (!turnstileToken) {
        return Response.json({ error: 'Verification required.' }, { status: 400 });
      }
      const ip = request.headers.get('CF-Connecting-IP') ?? undefined;
      const v = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
      if (!v.success) {
        return Response.json({ error: 'Verification failed. Try again.' }, { status: 403 });
      }
    }

    const result = await uploadAvatar(bucket, file);
    if ('error' in result) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({ ok: true, key: result.key, url: result.url });
  } catch (err) {
    console.error('[avatar] POST failed:', err);
    return Response.json({ error: 'Could not upload image.' }, { status: 500 });
  }
};
