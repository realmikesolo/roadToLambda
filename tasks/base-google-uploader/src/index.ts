import 'dotenv/config';
import { prompt } from 'inquirer';
import { create } from './google';
import { shorterLink } from './link-shorter';

uploadPhoto();

async function uploadPhoto(): Promise<void> {
  const { path } = await prompt<{ path: string }>({
    type: 'input',
    name: 'path',
    message: 'Drag and drop your image to terminal and press Enter for upload:',
  });

  const mimeType = path.split('.')[1].replace("'", '');
  let fileName = path.split('/').at(-1)!.replace("'", '');

  console.log(`Path to file: ${path}`);
  console.log(`File name: ${fileName}`);
  console.log(`File extension: ${mimeType}`);

  const { name } = await prompt({
    type: 'confirm',
    name: 'name',
    message: `You are uploading the file with the name: ${fileName}. Would you like to change it?`,
  });
  if (name) {
    const { newName } = await prompt({
      type: 'input',
      name: 'newName',
      message: 'Enter new file name (WITHOUT extension aka .jpg, .png):',
    });

    fileName = newName;
    console.log(`New file name: ${newName}`);
  }

  const fullMimeType = `image/${mimeType.slice(1)}`;

  const myPhoto = await create(fileName, fullMimeType, path);

  const { shortLink } = await prompt({
    type: 'confirm',
    name: 'shortLink',
    message: 'Would you like to shorten your link?',
  });
  if (!shortLink) return;

  console.log(
    `Your short link is ${await shorterLink(`https://drive.google.com/file/d/${myPhoto.data.id}`)}`,
  );
}
