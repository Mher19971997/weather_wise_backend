import { Assert, Bind } from '@weather_wise_backend/shared/src/amqp/amqp.entity';
import { constants } from '@weather_wise_backend/shared/src/config/constants';

export namespace amqpOptions {
  export const exchange: { assert: Assert['exchange'][]; bind: Bind['exchange'][] } = {
    assert: [{ exchange: constants.EXCHANGE_WORKER, type: 'direct', options: { autoDelete: false, durable: true } }],
    bind: [],
  };
  export const queue: { assert: Assert['queue'][]; bind: Bind['queue'][] } = {
    assert: [
      { queue: constants.QUEUE_USER_LIMIT_EXCEEDED, options: { autoDelete: false, durable: true } },
    ],
    bind: [
      { queue: constants.QUEUE_USER_LIMIT_EXCEEDED, source: constants.EXCHANGE_WORKER, pattern: `/send/${constants.USER_LIMIT_EXCEEDED}` },
    ],
  };
}