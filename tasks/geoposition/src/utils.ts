export function numToIp(num: number): string {
  let ip = `${num % 256}`;

  for (let i = 3; i > 0; i--) {
    num = Math.floor(num / 256);
    ip = `${num % 256}.${ip}`;
  }

  return ip;
}

export function ipToNum(ip: string): number {
  return ip
    .split('.')
    .reduce((acc, value, index) => acc + Math.pow(256, 3 - index) * Number(value), 0);
}
