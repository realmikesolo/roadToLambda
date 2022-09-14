import { drive_v3, google } from 'googleapis';

import { Env } from './env';
import fs from 'node:fs';
import { GaxiosResponse } from 'googleapis-common';

const oauth2Client = new google.auth.OAuth2(
  Env.GOOGLE_CLIENT_ID,
  Env.GOOGLE_CLIENT_SECRET,
  Env.GOOGLE_REDIRECT_URL,
);
const drive = google.drive({ version: 'v3', auth: oauth2Client });

oauth2Client.setCredentials({ refresh_token: Env.GOOGLE_REFRESH_TOKEN });

export async function create(
  fileName: string,
  fullMimeType: string,
  path: string,
): Promise<GaxiosResponse<drive_v3.Schema$File>> {
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

  return myPhoto;
}
