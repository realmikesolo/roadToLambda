import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { Env } from '../env';
import { JtiModel } from '../models/jti';
import { UserModel } from '../models/user';

export class AuthController {
  public async registration(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!(email.length >= 6 && email.length <= 64)) {
        res.status(400).send('Email length must be in range from 6 to 64');
        return;
      } else if (!(password.length >= 8 && password.length <= 64)) {
        res.status(400).send('Password length must be in range from 8 to 64');
        return;
      } else if (!email.match(/^[\w-+.@]+$/)) {
        res.status(400).send('Invalid symbols in email');
        return;
      } else if (password.match(/[<>{}]/)) {
        res.status(400).send('Invalid symbols in password');
        return;
      }

      if (await UserModel.findOne({ email })) {
        res.status(403).send('User has already signed in');
        return;
      }

      const hash = await bcrypt.hash(password, 7);
      await UserModel.create({ email, password: hash });

      res.status(200).send('User has been signed in');
    } catch (e) {
      console.error(e);
      res.status(500).send('Registartion error');
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.query;
    const user = await UserModel.findOne({ email: email as string });
    if (!user) {
      res.status(404).send('User has not been signed in');
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(403).send('Incorrect password');
      return;
    }

    const accessTokenTtl = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    const accessToken = jwt.sign({ user }, Env.JWT_TOKEN_KEY, {
      expiresIn: accessTokenTtl,
    });
    const jwtid = randomUUID();
    const refreshToken = jwt.sign({ user }, Env.JWT_REFRESH_TOKEN_KEY, {
      jwtid,
      expiresIn: '1w',
    });

    await JtiModel.create(jwtid);

    res.status(200).send({ accessToken, refreshToken, accessTokenTtl });
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    const authorization = req.headers.authorization?.replace('Bearer ', '');

    try {
      let decoded;
      try {
        decoded = jwt.verify(authorization ?? '', Env.JWT_REFRESH_TOKEN_KEY) as JwtPayload;
      } catch {
        res.status(401).send('Unauthorized');
        return;
      }
      const jti = await JtiModel.findOne({ _id: decoded.jti });
      if (!jti) {
        res.status(403).send('Forbidden');
        return;
      }

      const user = await UserModel.findOne({ email: decoded.user.email });
      const accessTokenTtl = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
      const accessToken = jwt.sign({ user }, Env.JWT_TOKEN_KEY, {
        expiresIn: accessTokenTtl,
      });
      const jwtid = randomUUID();
      const refreshToken = jwt.sign({ user }, Env.JWT_REFRESH_TOKEN_KEY, {
        jwtid,
        expiresIn: '1w',
      });

      await JtiModel.delete({ _id: jti._id });
      await JtiModel.create(jwtid);

      res.status(200).send({ accessToken, refreshToken, accessTokenTtl });
    } catch (e) {
      console.error(e);

      res.status(500).send('Internal Server Error');
    }
  }
}
