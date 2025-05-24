/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) return user;
    }
    return null;
  }
  async login(user: IUser, response: Response) {
    const { _id, email, name, role, isPremium } = user;
    const payload = {
      sub: 'token login',
      iss: 'from sever',
      _id,
      email,
      name,
      role,
      isPremium,
    };
    const refresh_token = this.createRefreshToken(payload);

    await this.usersService.updateUserToken(refresh_token, _id);
    const configValue = this.configService.get<string>('JWT_REFRESH_EXPIRE');
    const expireString: string = configValue || '1d';
    const expire = ms(expireString as ms.StringValue);

    // set refresh token with cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: expire,
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        email,
        name,
        role,
        isPremium,
      },
    };
  }

  async register(user: RegisterUserDto) {
    let newUser = await this.usersService.register(user);
    return { _id: newUser?._id, createdAt: newUser?.createdAt };
  }

  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
    return refresh_token;
  };

  processNewToken = async (refreshToken: string, res: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      let userRf = await this.usersService.findUserByToken(refreshToken);
      if (userRf) {
        const { _id, email, name, role, isPremium } = userRf;
        const payload = {
          sub: 'token refresh',
          iss: 'from sever',
          _id,
          email,
          name,
          role,
          isPremium,
        };
        const refresh_token = this.createRefreshToken(payload);

        await this.usersService.updateUserToken(refresh_token, _id.toString());
        const configValue =
          this.configService.get<string>('JWT_REFRESH_EXPIRE');
        const expireString: string = configValue || '1d';
        const expire = ms(expireString as ms.StringValue);

        res.clearCookie('refresh_token');
        // set refresh token with cookie
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: expire,
        });

        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            email,
            name,
            role,
            isPremium,
          },
        };
      } else throw new BadRequestException(`khong hop le vui long login`);
    } catch (error) {
      throw new BadRequestException(`khong hop le vui long login`);
    }
  };

  logout = async (user: IUser, res: Response) => {
    await this.usersService.updateUserToken('', user._id);
    res.clearCookie('refresh_token');
    return 'ok';
  };
}
