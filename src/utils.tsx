export function stringFromEnum(e, value): string {
  for (var k in e) if (e[k] == value) return k;
  return null;
}

export function enumFromString<T>(e, value: string): T {
  for (var k in e) if (k == value) return e[k];
  return null;
}
