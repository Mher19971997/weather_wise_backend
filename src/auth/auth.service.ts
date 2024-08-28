import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as ___ from 'lodash';
import assert from 'assert';
import { UserService } from '@weather_wise_backend/src/user/user.service';
import { authDto } from '@weather_wise_backend/src/auth/dto';
import { l10n } from '@weather_wise_backend/shared/src/config/l10n-constants';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { ConfigService } from '@weather_wise_backend/shared/src/config/config.service';
import { constants } from '@weather_wise_backend/shared/src/config/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    
    ) {}

    private async generateTokens(payload: any): Promise<authDto.outputs.LoginOutput | null>{
      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: this.configService.get<string>(`crypto.jwt.extraOptions.shortExpiresIn`), //'1 d',
          secret: this.configService.get<string>('crypto.jwt.secret'),
        }),
        refresh_token: this.jwtService.sign(payload, {
          expiresIn: this.configService.get<string>(`crypto.jwt.extraOptions.longExpiresIn`), //'30 d'
          secret: this.configService.get<string>('crypto.jwt.secret'),
        }),
      }
    }

    async validateUser(token: string): Promise<Partial<any> | null> {
      const data = this.jwtService.decode(token) as { user: string };
      const user = await this.userService.findOne({ uuid: data.user });
      if (user) {
        this.jwtService.verify(token, { secret: user.secret });
        return ___.pick(user, ['_id', 'roles']);
      }
      return null;
    }

  async checkContact(inputDto: authDto.inputs.CheckContactInput): Promise<any | null> {
    return inputDto;
  }

  async verifyContact(inputDto: authDto.inputs.VerifyContactInput): Promise<any | null> {
    return inputDto;
  }

  async register(inputDto: authDto.inputs.RegisterInput): Promise<any | null> {
    const userRes = await this.userService.findOne(___.pick(inputDto, ['email']));
    assert(!userRes, l10n.email_exist);

    const phoneNumberRes = await this.userService.findOne(___.pick(inputDto, ['phone']));
    assert(!phoneNumberRes, l10n.phone_exist);

    const userInput = await this.userService.password(inputDto);
    return await this.userService.create({
      ...inputDto,
      ...userInput,
      roles: [constants.USER_ROLE],
    });
  }

  async login(inputDto: authDto.inputs.LoginInput): Promise<authDto.outputs.LoginOutput | null> {
    const userRes = await this.userService.findOne(___.pick(inputDto, ['email']));
    assert(userRes, l10n.wrong_email_or_password);

    await this.cryptoService.checkPassword(userRes.password, inputDto.password, userRes.secret);

    const payload = { sub: await this.cryptoService.encrypt(`${userRes.uuid}`) };

    return this.generateTokens(payload) 
  }
}
