import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CommonStore } from '../store/CommonStore';

@Injectable()
export class V8_AlterTables extends CommonStore {
  private readonly logger = new Logger(V8_AlterTables.name);

  constructor(@InjectConnection() private connection: Sequelize) {
    super();
  }

  async up(): Promise<void> {
    await this.connection.query(`
    ALTER TABLE ONLY "public"."configurations"
      ADD CONSTRAINT "configurations_pk" PRIMARY KEY ("uuid");

    ALTER TABLE ONLY "public"."contacts"
      ADD CONSTRAINT "contacts_pk" PRIMARY KEY ("uuid");
    `);
  }
}
