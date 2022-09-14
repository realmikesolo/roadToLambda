import { question } from './questions';

sort();

function sort(): void {
  let input: string;

  process.stdout.write('Hello, enter 10 words or digits dividing them in spaces:');
  process.stdin.on('data', (data) => {
    input = data.toString('utf8');
    process.stdin.removeAllListeners('data');

    process.stdout.write(question);
    process.stdout.write('Select (1 - 5) and press ENTER: ');

    process.stdin.on('data', (data) => {
      const choice = data.toString('utf8');
      const values = input.trim().split(' ');
      if (choice.replace('\n', '') === 'exit') {
        console.log('Good bye! Come back again!');
        process.exit();
      }

      const stringWords = values.filter((a) => !Number.isInteger(Number(a)));
      const digitWords = values.filter((a) => Number.parseFloat(a));

      let result: string[];
      switch (choice[0]) {
        case '1':
          result = stringWords.sort();
          break;
        case '2':
          result = digitWords.sort((a, b) => Number(a) - Number(b));
          break;
        case '3':
          result = digitWords.sort((a, b) => Number(b) - Number(a));
          break;
        case '4':
          result = stringWords.sort((a, b) => a.length - b.length);
          break;
        case '5':
          result = [...new Set(stringWords)];
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
