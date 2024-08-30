import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@weather_wise_backend/src/auth/guards/auth.guard';
import { CryptoService } from '@weather_wise_backend/shared/src/crypto/crypto.service';
import { Logger } from '@weather_wise_backend/shared/src/util/logger';
import { UserService } from '@weather_wise_backend/src/user/user.service';
import { ConfigurationService } from '@weather_wise_backend/src/configuration/configuration.service';

@Injectable()
export class RolesGuard extends AuthGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  protected baseCanActivate = super.canActivate;

  constructor(
    readonly cryptoService: CryptoService,
    readonly configurationService: ConfigurationService,
    readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      return this.canActivateHttp(context);
    }
  }

  async canActivateHttp(context: ExecutionContext): Promise<boolean> {
    const reqContext = context.switchToHttp().getRequest();
    const auth = reqContext.header('Authorization');
    const operation = `${reqContext.method}:${reqContext?.route?.path}`;
    const [type] = (auth && auth.split(' ')) || [null];

    this.logger.debug(
      {
        request: context.getType(),
        operation,
        body: reqContext.body,
        query: reqContext.query,
        params: reqContext.params,
        user: reqContext.user,
      },
      null,
      { request: context.getType(), operation, user: reqContext.user },
    );
    if (type && type === 'Bearer') {
      await this.baseCanActivate(context);
    } 
    console.log(reqContext.user,"reqContext.userreqContext.user");
    
    return this.validateUser(operation, reqContext.user?.userUuid);
  }

  protected async validateUser(operation: string, userUuid: string) {
    console.log(operation,121234);
    
    const config = await this.getConfiguration(operation);
    console.log(config,5555);
    
    const configRes = this.checkConfiguration(config);

    if (configRes !== undefined) {
      return configRes;
    }
    if (!userUuid) {
      return false;
    }

    const user = await (config && this.getUser(userUuid, config));
    return !!user && config.operation === operation;
  }

  protected async getConfiguration(operation: string): Promise<{ operation: string; access: string[] }> {
    return this.configurationService.getRole(operation);
  }

  protected checkConfiguration(config: { access: string[] }) {
    if (config?.access.includes('none')) {
      return false;
    }
    if (config?.access.includes('any')) {
      return true;
    }
  }

  protected async getUser(userUuid: string, configs: { operation: string; access: string[] }) {
    console.log(11122112);
    
    const user = await this.userService.findOne({ uuid: userUuid })
    if (!user) {
      return null;
    }
    
    const roles = user.roles.filter((value: string) => configs?.access.includes(value));
    console.log(roles,"roles");
    
    // const roles = user.roles.filter((value: string) => configs?.access[0].split(', ').includes(value));

    if (roles.length) {
      return user;
    }
  }
}
