import 'dotenv/config';
import { google } from 'googleapis';
import { prompt } from 'inquirer';
import fs from 'node:fs';
import { Env } from './env';
import { shorterLink } from './link-shorter';

const oauth2Client = new google.auth.OAuth2(
  Env.GOOGLE_CLIENT_ID,
  Env.GOOGLE_CLIENT_SECRET,
  Env.GOOGLE_REDIRECT_URL,
);
const drive = google.drive({ version: 'v3', auth: oauth2Client });

oauth2Client.setCredentials({ refresh_token: Env.GOOGLE_REFRESH_TOKEN });

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

  const myPhoto = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: fullMimeType,
      parents: [Env.GOOGLE_DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: fullMimeType,
      body: fs.createReadStream(path.replace(/'+/g, '')),
    },
  });

  await drive.permissions.create({
    fileId: myPhoto.data.id!,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

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
