import { prompt } from 'inquirer';
import { appendFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dataPath = resolve(__dirname, '../data/db.txt');

createUser();

async function createUser(): Promise<void> {
  const { name } = await prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: "Enter the user's name. To cancel press ENTER:",
  });
  if (!name.length) return useDB();

  const { gender } = await prompt<{ gender: 'male' | 'female' }>({
    type: 'list',
    name: 'gender',
    message: 'Choose your gender.',
    choices: ['male', 'female'],
  });
  const { age } = await prompt<{ age: number }>({
    type: 'number',
    name: 'age',
    message: 'Enter your age:',
  });

  if (Number.isNaN(age)) return useDB();

  const user = { name, gender, age };

  await appendFile(dataPath, JSON.stringify(user) + '\n');

  createUser();
}

async function useDB(): Promise<void> {
  const { answer } = await prompt({
    type: 'confirm',
    name: 'answer',
    message: 'Would you like to search values in DB?',
  });
  if (!answer) {
    console.log('Goodbye');
    process.exit();
  }

  const data = await readFile(dataPath, 'utf8').then((res) =>
    res
      .split('\n')
      .slice(0, -1)
      .map((el) => JSON.parse(el)),
  );
  console.log(data);

  const { user } = await prompt({
    type: 'input',
    name: 'user',
    message: "Enter user's name you wanna find in DB:",
  });

  const result = data.find(({ name }) => name === user);
  if (result) {
    console.log(`User ${user} was found\n`, result);
  } else {
    console.log('User was not found ');
  }
}
