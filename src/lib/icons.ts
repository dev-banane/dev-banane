import { HUGEICONS, type IconName } from './hugeicons';

export function inlineIcon(
  name: IconName,
  { size = 16, className = '' }: { size?: number; className?: string } = {}
): string {
  const icon = HUGEICONS[name];
  const cls = className ? ` class="${className}"` : '';
  return (
    `<svg${cls} xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="0 0 ${icon.width} ${icon.height}" aria-hidden="true" focusable="false">` +
    `${icon.body}</svg>`
  );
}
