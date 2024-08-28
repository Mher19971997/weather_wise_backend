import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CommonStore } from '../store/CommonStore';

@Injectable()
export class V3_CreateContactTable extends CommonStore {
  private readonly logger = new Logger(V3_CreateContactTable.name);

  constructor(@InjectConnection() private connection: Sequelize) {
    super();
  }

  async up(): Promise<void> {
    await this.connection.query(`
    CREATE TABLE "public"."contacts" (
      "uuid" uuid DEFAULT "public".uuid_generate_v4() NOT NULL,
      "value" text NOT NULL,
      "info" jsonb NOT NULL,
      "type" text,
      "status" text NOT NULL,  
      "code" text NOT NULL,
      "createdAt" timestamp without time zone DEFAULT now(),
      "updatedAt" timestamp without time zone DEFAULT now(),
      "deletedAt" timestamp without time zone
  );
    `);
  }
}
