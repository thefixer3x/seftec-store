
// Function to calculate MD5 hash for caching
export function md5(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  return Array.from(new Uint8Array(data))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
