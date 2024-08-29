import { ModuleRef } from '@nestjs/core';
import { Logger, Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Channel, Options, ConsumeMessage } from 'amqplib';

import { Assert, Bind } from '@weather_wise_backend/shared/src/amqp/amqp.entity';
import { amqpOptions } from '@weather_wise_backend/shared/src/config/amqp.constants';
import { json5 } from '@weather_wise_backend/shared/src/util/parser/json5';
// import { json5 } from '@weather_wise_backend/shared/util/parser/json5';

@Injectable()
export class AmqpService implements OnModuleInit {
  private readonly logger = new Logger(AmqpService.name);
  private readonly _channel: Channel;

  static exchangeMap: Assert['exchange'][] = amqpOptions.exchange.assert;

  static binExchangeMap: Bind['exchange'][] = amqpOptions.exchange.bind;

  static queueMap: Assert['queue'][] = amqpOptions.queue.assert;

  static bindQueueMap: Bind['queue'][] = amqpOptions.queue.bind;

  static consumerMap: {
    queue: string;
    options?: Options.Consume;
    descriptor: (msg: ConsumeMessage | null, channel: Channel, context: any) => void;
    instance: any;
  }[] = [];

  constructor(@Inject('AMQPChannel') channel: Channel, private readonly moduleRef: ModuleRef) {
    this._channel = channel;
  }

  async onModuleInit() {
    await this._channel.prefetch(65535);
    for await (const exchange of AmqpService.exchangeMap) {
      await this._channel.assertExchange(exchange.exchange, exchange.type, exchange.options);
      this.logger.log(`AssertExchange: ${json5.stringify(exchange)}`);
    }
    for await (const binExchange of AmqpService.binExchangeMap) {
      await this._channel.bindExchange(binExchange.destination, binExchange.source, binExchange.pattern, binExchange.args);
      this.logger.log(`BindExchange: ${json5.stringify(binExchange)}`);
    }
    for await (const queue of AmqpService.queueMap) {
      await this._channel.assertQueue(queue.queue, queue.options);
      this.logger.log(`AssertQueue: ${json5.stringify(queue)}`);
    }
    for await (const bindQueue of AmqpService.bindQueueMap) {
      await this._channel.bindQueue(bindQueue.queue, bindQueue.source, bindQueue.pattern, bindQueue.args);
      this.logger.log(`BindQueue: ${json5.stringify(bindQueue)}`);
    }
    for await (const consumer of AmqpService.consumerMap) {
      const instance = this.moduleRef.get(consumer.instance, { strict: false });
      await this._channel.consume(
        consumer.queue,
        (msg: ConsumeMessage | null) => consumer.descriptor(msg, this._channel, instance),
        consumer.options,
      );
      this.logger.log(`Consume: ${json5.stringify(consumer)}`);
    }
  }

  async channel(): Promise<Channel> {
    return this._channel;
  }

  async send<T>(exchange: string, routingKey: string, content: T, options?: Options.Publish) {
    return (await this.channel()).publish(exchange, routingKey, Buffer.from(json5.stringify(content)), options);
  }

  async sendToQueue<T>(queue: string, content: T, options?: Options.Publish) {
    return (await this.channel()).sendToQueue(queue, Buffer.from(json5.stringify(content)), options);
  }
}