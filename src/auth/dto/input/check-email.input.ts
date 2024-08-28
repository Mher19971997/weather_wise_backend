import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    }
  },
  required: ['email']
})
export class CheckUserEmailInput {
  declare email: string;
}
