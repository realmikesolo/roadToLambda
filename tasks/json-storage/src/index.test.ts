import { expect } from 'chai';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import fetch from 'node-fetch';
import { getFilePath } from './controllers/main.controller';
import { startServer } from './server';
import { randomUUID } from 'node:crypto';

describe('json-storage', () => {
  const testBody = { name: 'Elon Musk' };

  before(() => startServer(1991));

  describe('POST /', () => {
    it('given valid data, then 201', async () => {
      const route = randomUUID();
      const data = await fetch(`http://localhost:1991/${route}`, {
        method: 'post',
        body: JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(data.status).eql(201);

      const file = await readFile(getFilePath(route), 'utf8');
      expect(file).eql(JSON.stringify(testBody));

      await unlink(getFilePath(route));
    });

    it('given too short route, then 400', async () => {
      const data = await fetch('http://localhost:1991/t', {
        method: 'post',
        body: JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(400);
    });

    it('given too long route, then 400', async () => {
      const data = await fetch(`http://localhost:1991/${'t'.repeat(65)}`, {
        method: 'post',
        body: JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(400);
    });

    it('given invalid symbols in route, then 400', async () => {
      const data = await fetch('http://localhost:1991/a$$hole', {
        method: 'post',
        body: JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(400);
    });
  });

  describe('GET /', () => {
    it('given valid route, then 200', async () => {
      const route = randomUUID();
      await writeFile(getFilePath(route), JSON.stringify(testBody));

      const data = await fetch(`http://localhost:1991/${route}`);
      const body = await data.json();

      expect(data.status).eql(200);
      expect(body).eql(testBody);

      await unlink(getFilePath(route));
    });

    it('given nonexistent route, then 404', async () => {
      const data = await fetch('http://localhost:1991/test1');

      expect(data.status).eql(404);
    });
  });
});
