const prototype = Array.prototype as any;

prototype.chunk ??= function chunk<T>(size: number): T[][] {
  const chunked: T[][] = [];

  for (let i = 0; i < Math.ceil(this.length / size); i++) {
    for (let j = i * size; j < size * i + size; j++) {
      chunked[i] = [...(chunked[i] ?? []), this[j]];
    }
  }

  chunked[chunked.length - 1] = chunked.at(-1)!.filter((x) => x);

  return chunked;
};

prototype.findLast ??= function findLast<T>(predicate: (value: T) => boolean): T | null {
  const { length } = this;
  const index = length - 1;

  for (let i = index; i > 0; i--) {
    if (predicate(this[i])) {
      return this[i];
    }
  }

  return null;
};

prototype.minBy ??= function minBy<U, T>(selector: (value: T) => U): T {
  let result: T;

  let computed: U | undefined;

  for (const x of this) {
    const current = selector(x);

    if (
      current != null &&
      (computed === undefined ? current === current && current !== undefined : current < computed!)
    ) {
      computed = current;
      result = x;
    }
  }

  return result!;
};

prototype.maxBy ??= function maxBy<U, T>(selector: (value: T) => U): T {
  let result: T;

  let computed: U | undefined;

  for (const x of this) {
    const current = selector(x);

    if (
      current != null &&
      (computed === undefined ? current === current && current !== undefined : current > computed!)
    ) {
      computed = current;
      result = x;
    }
  }

  return result!;
};

prototype.customFind ??= function customFind<T>(predicate: (value: T) => boolean): T | null {
  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i])) {
      return this[i];
    }
  }

  return null;
};

prototype.countBy ??= function <T>(selector: (value: T) => number): number {
  let result = 0;

  for (const x of this) {
    result += selector(x);
  }
  return result;
};

prototype.customFilter ??= function customFilter<T>(predicate: (value: T) => boolean): T[] {
  const result: T[] = [];

  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i])) {
      result.push(this[i]);
    }
  }

  return result;
};

prototype.filterNot ??= function filterNot<T>(predicate: (value: T) => boolean): T[] {
  const result: T[] = [];

  for (let i = 0; i < this.length; i++) {
    if (!predicate(this[i])) {
      result.push(this[i]);
    }
  }

  return result;
};

prototype.filterIndexed ??= function filterIndexed<T>(predicate: (index: number, value: T) => boolean): T[] {
  const result: T[] = [];

  for (let i = 0; i < this.length; i++) {
    if (predicate(i, this[i])) {
      result.push(this[i]);
    }
  }

  return result;
};

prototype.average ??= function average(): number {
  const { length } = this;
  let sum = 0;

  for (let i = 0; i < length; i++) {
    sum += this[i];
  }

  return sum / length;
};

prototype.groupBy ??= function groupBy<T, U, K>(
  keySelector: (key: T) => U,
  valueTransform?: (value: T) => K,
): Map<U, T[]> {
  const result = new Map<U, T[]>();

  for (let i = 0; i < this.length; i++) {
    const key = keySelector(this[i]);
    let item = this[i];

    if (valueTransform) {
      item = valueTransform(this[i]);
    }
    const value = result.get(key);

    if (value) {
      value.push(item);
    } else {
      result.set(key, [item]);
    }
  }

  return result;
};

prototype.distinctBy ??= function distinctBy<T, U>(selector: (key: T) => U): T[] {
  const result = new Map<U, T>();

  for (let i = 0; i < this.length; i++) {
    const key = selector(this[i]);
    const value = result.get(key);
    if (!value && key) {
      result.set(key, this[i]);
    }
  }

  return [...result.values()];
};

prototype.fold ??= function fold<T, U extends T>(initial: U, operation: (acc: U, value: T) => U): U {
  let result = initial;

  for (let i = 0; i < this.length; i++) {
    result = operation(this[i], result);
  }

  return result;
};

prototype.flatten ??= function flatten<T>(): T[] {
  let result: T[] = [];

  for (let i = 0; i < this.length; i++) {
    result = [...result, ...this[i]];
  }

  return result;
};

prototype.all ??= function all<T>(predicate: (value: T) => boolean): boolean {
  const { length } = this;
  let count = 0;

  for (let i = 0; i < length; i++) {
    if (predicate(this[i])) {
      count++;
    }
  }

  if (count === length) return true;

  return false;
};

prototype.any ??= function any<T>(predicate: (value: T) => boolean): boolean {
  const { length } = this;
  let count = 0;

  for (let i = 0; i < length; i++) {
    if (predicate(this[i])) {
      count++;
    }
  }

  if (!count) return false;

  return true;
};

prototype.associateBy ??= function associateBy<T, U>(keySelector: (key: T) => U): Map<U, T> {
  const result = new Map<U, T>();

  for (let i = 0; i < this.length; i++) {
    const key = keySelector(this[i]);

    result.set(key, this[i]);
  }

  return result;
};

prototype.multiply ??= function (factor = 10): number[] {
  const result: number[] = [];

  for (let i = 0; i < this.length; i++) {
    result[i] = this[i] * factor;
  }

  return result;
};
