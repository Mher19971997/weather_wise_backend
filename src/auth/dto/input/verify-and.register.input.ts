import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    code: {
      type: 'string'
    }
  },
  required: ['email', 'code']
})
export class VerifyAndRegisterInput {
  declare email: string;
  declare code: string;
}
