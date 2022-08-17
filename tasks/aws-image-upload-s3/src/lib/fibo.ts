export function fibo(): number[] {
  const fib = [0, 1];

  for (let i = 2; i <= 10; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }

  return fib;
}
