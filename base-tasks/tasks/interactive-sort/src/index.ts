#!/usr/bin/env node

function sort(): void {
  let input: string;

  process.stdout.write('Hello, enter 10 words or digits dividing them in spaces:');
  process.stdin.on('data', (data) => {
    input = data.toString('utf8');
    process.stdin.removeAllListeners('data');

    process.stdout.write(
      'How would you like to sort values:\n1. Words by name (from A to Z).\n2. Digits in ascending order.\n3. Digits in descending order.\n4. Words by quantity of letters.\n5. Only unique words.\n6. Only unqiue values.\n\n',
    );
    process.stdout.write('Select (1 - 5) and press ENTER: ');

    process.stdin.on('data', (data) => {
      const choice = data.toString('utf8');
      const values = input.trim().split(' ');
      if (choice.replace('\n', '') === 'exit') {
        console.log('Good bye! Come back again!');
        process.exit();
      }

      let result: string[];
      switch (choice[0]) {
        case '1':
          result = values.filter((a) => !Number.isInteger(Number(a))).sort();
          break;
        case '2':
          result = values.filter((a) => Number.parseFloat(a)).sort((a, b) => Number(a) - Number(b));
          break;
        case '3':
          result = values.filter((a) => Number.parseFloat(a)).sort((a, b) => Number(b) - Number(a));
          break;
        case '4':
          result = values
            .filter((a) => !Number.isInteger(Number(a)))
            .sort((a, b) => a.length - b.length);
          break;
        case '5':
          result = [...new Set(values.filter((a) => !Number.isInteger(Number(a))))];
          break;
        case '6':
          result = [...new Set(values)];
          break;
        default:
          result = ['Unknown choice'];
      }
      console.log(result);

      sort();
    });
  });
}

sort();
