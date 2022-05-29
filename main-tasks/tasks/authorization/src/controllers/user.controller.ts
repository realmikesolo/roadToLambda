import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  public async getData(req: ModifiedRequest, res: Response): Promise<void> {
    res.status(200).send({
      request_num: req.url.at(-1),
      data: { username: req.user.email },
    });
  }

  public async middleware(req: ModifiedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization = req.headers.authorization?.replace('Bearer ', '');
      if (!authorization) {
        res.status(401).send('Unauthorized');
        return;
      }
      let decoded;
      try {
        decoded = jwt.verify(authorization ?? '', process.env.JWT_TOKEN_KEY!) as JwtPayload;
      } catch {
        res.status(401).send('Unauthorized');
        return;
      }
      req.user = decoded.user;
      next();
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  }
}

type ModifiedRequest = Request & { user: { email: string; password: string } };
