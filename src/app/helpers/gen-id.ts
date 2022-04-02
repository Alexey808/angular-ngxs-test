export function genId(): string {
  return String(new Date().valueOf() + Math.ceil(Math.random() * 10000));
}
