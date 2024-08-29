import { applyDecorators } from '@nestjs/common';
import { Options, Channel, ConsumeMessage } from 'amqplib';
import { json5 } from '@weather_wise_backend/shared/src/util/parser/json5';
import { Assert, Bind } from '@weather_wise_backend/shared/src/amqp/amqp.entity';

import { AmqpService } from '@weather_wise_backend/shared/src/amqp/amqp.service';

export namespace amqp {
  export const Assert = ({ exchange, queue }: Assert) => {
    return applyDecorators((target: any, _propertyKey: string, _descriptor: PropertyDescriptor) => {
      exchange &&
        AmqpService.exchangeMap.push({
          exchange: exchange.exchange,
          type: exchange.type,
          options: exchange.options,
        });
      queue &&
        AmqpService.queueMap.push({
          queue: queue.queue,
          options: queue.options,
        });
    });
  };

  export const Bind = ({ exchange, queue }: Bind) => {
    return applyDecorators((target: any, _propertyKey: string, _descriptor: PropertyDescriptor) => {
      exchange &&
        AmqpService.binExchangeMap.push({
          destination: exchange.destination,
          source: exchange.source,
          pattern: exchange.pattern,
          args: exchange.args,
        });
      queue &&
        AmqpService.bindQueueMap.push({
          queue: queue.queue,
          source: queue.source,
          pattern: queue.pattern,
          args: queue.args,
        });
    });
  };

  export const Consume = (queue: string, options?: Options.Consume) => {
    return applyDecorators((target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
      const original = descriptor.value;
      descriptor.value = function (data: any, msg: ConsumeMessage | null, channel: Channel, context: any) {
        if (context) {
          return original.apply(context, [data, msg, channel]);
        }
        return original(data, msg, channel);
      };

      AmqpService.consumerMap.push({
        queue,
        options,
        instance: target.constructor,
        descriptor: async (msg: ConsumeMessage | null, channel: Channel, context: any) =>
          descriptor.value(json5.parse(msg.content.toString()), msg, channel, context),
      });
    });
  };
}