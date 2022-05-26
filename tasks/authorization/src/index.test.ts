import 'dotenv/config';
import { expect } from 'chai';
import { startServer } from './server';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { connectMongo, db } from './db';
import { UserModel } from './models/user';
import { JtiModel } from './models/jti';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

describe('authorization', () => {
  before(async () => {
    await connectMongo();
    await startServer(3001);
  });
  afterEach(() => db.collection('users').deleteMany({}));

  describe('POST /sign_up', () => {
    it('given valid email and password, then 200', async () => {
      const data = await fetch('http://localhost:3001/auth/sign_up', {
        method: 'post',
        body: JSON.stringify({ email: 'timish@gmailcom', password: 'slavaukraine' }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });

      expect(data.status).eql(200);
    });

    it('given too short email, then 400', async () => {
      const data = await fetch('http://localhost:3001/auth/sign_up', {
        method: 'post',
        body: JSON.stringify({ email: 'Slava', password: 'Ukraine' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(400);
    });

    it('given too short password, then 400', async () => {
      const data = await fetch('http://localhost:3001/auth/sign_up', {
        method: 'post',
        body: JSON.stringify({ email: 'SlavaUkraine@peremoha', password: 'Kyiv' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(400);
    });

    it('given invalid email, then 400', async () => {
      const data = await fetch('http://localhost:3001/auth/sign_up', {
        method: 'post',
        body: JSON.stringify({ email: 'Slava#$%@peremoha', password: 'KYIVxDNIPRO' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(400);
    });

    it('given invalid password, then 400', async () => {
      const data = await fetch('http://localhost:3001/auth/sign_up', {
        method: 'post',
        body: JSON.stringify({ email: 'SlavaUkraine@peremoha', password: 'kyiv{<>5}' }),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(data.status).eql(400);
    });

    it('given registrated user, then 403', async () => {
      await UserModel.create({
        email: 'timish-04@gmail.com',
        password: await bcrypt.hash('12345678', 7),
      });

      const data = await fetch('http://localhost:3001/auth/sign_up', {
        method: 'post',
        body: JSON.stringify({ email: 'timish-04@gmail.com', password: '12345678' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(data.status).eql(403);
    });
  });

  describe('POST /login', () => {
    it('success login, then 200', async () => {
      await UserModel.create({
        email: 'timish-04@gmail.com',
        password: await bcrypt.hash('12345678', 7),
      });

      const data = await fetch(
        'http://localhost:3001/auth/login?email=timish-04@gmail.com&password=12345678',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      expect(data.status).eql(200);
    });

    it('incorrect password, then 403', async () => {
      await UserModel.create({
        email: 'timish-04@gmail.com',
        password: await bcrypt.hash('1234568', 7),
      });

      const data = await fetch(
        'http://localhost:3001/auth/login?email=timish-04@gmail.com&password=12345678',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      expect(data.status).eql(403);
    });

    it('user does not exist', async () => {
      const data = await fetch(
        'http://localhost:3001/auth/login?email=timish-04@gmail.com&password=12345678',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      expect(data.status).eql(404);
    });
  });

  describe('POST /refresh', () => {
    it('invalid token, then 401', async () => {
      const data = await fetch('http://localhost:3001/auth/refresh', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', Authorization: 'INVALID_TOKEN' },
      });

      expect(data.status).eql(401);
    });

    it('forbidden, then 403', async () => {
      const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_TOKEN_KEY!, {
        jwtid: 'invalidtima',
        expiresIn: '1m',
      });
      const data = await fetch('http://localhost:3001/auth/refresh', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshToken}` },
      });

      expect(data.status).eql(403);
    });

    it('success, then 200', async () => {
      const jwtid = randomUUID();
      await JtiModel.create(jwtid);
      const user = await UserModel.create({ email: 'helpme', password: 'please' });
      const refreshToken = jwt.sign({ user }, process.env.JWT_REFRESH_TOKEN_KEY!, {
        jwtid,
        expiresIn: '1m',
      });

      const data = await fetch('http://localhost:3001/auth/refresh', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshToken}` },
      });

      await JtiModel.delete({ _id: jwtid });

      expect(data.status).eql(200);
    });
  });

  describe('GET /me', () => {
    it('invalid token, then 401', async () => {
      const data = await fetch('http://localhost:3001/user/me1', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer INVALID_TOKEN' },
      });

      expect(data.status).eql(401);
    });

    it('success, then 200', async () => {
      const accessToken = jwt.sign(
        {
          user: {
            email: 'pricol@gmail.com',
            password: 'pricolhahaha',
          },
        },
        process.env.JWT_TOKEN_KEY!,
        {
          jwtid: 'randomId',
          expiresIn: '1m',
        },
      );
      const data = await fetch('http://localhost:3001/user/me2', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      });

      expect(data.status).eql(200);
    });
  });
});
