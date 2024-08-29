import { Options } from 'amqplib';

export interface Assert {
  exchange?: {
    exchange: string;
    type: 'direct' | 'topic' | 'headers' | 'fanout' | 'match' | string;
    options?: Options.AssertExchange;
  };
  queue?: {
    queue: string;
    options?: Options.AssertQueue;
  };
}

export interface Bind {
  exchange?: {
    destination: string;
    source: string;
    pattern: string;
    args?: any;
  };
  queue?: {
    queue: string;
    source: string;
    pattern: string;
    args?: any;
  };
}

export interface Consume {
  queue: string;
  options?: Options.Consume;
}

export interface Publish<T> {
  exchange: string;
  routingKey: string;
  content: T;
  options?: Options.Publish;
}

export interface SendToQueue<T> {
  queue: string;
  content: T;
  options?: Options.Publish;
}