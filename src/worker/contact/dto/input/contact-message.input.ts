import { decorator } from '@weather_wise_backend/shared/src/decorator';
import { ApiProperty } from '@nestjs/swagger';

@decorator.ajv.Schema({
  type: 'object',
  properties: {
    from: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
    response: {
      type: 'object',
    },
    status: {
      type: 'string',
    },
  },
  required: ['to', 'response', 'status'],
})
export class ContactMessageInput {
  @ApiProperty({ type: 'string' })
  from: string;
  @ApiProperty({ type: 'string' })
  to: string;
  @ApiProperty({ type: 'object' })
  response: any;
  @ApiProperty({ type: 'string' })
  status: string;
}