import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CommonStore } from '../store/CommonStore';

@Injectable()
export class V7_AlterUserTable extends CommonStore {
  private readonly logger = new Logger(V7_AlterUserTable.name);

  constructor(@InjectConnection() private connection: Sequelize) {
    super();
  }

  async up(): Promise<void> {
    await this.connection.query(`
    ALTER TABLE ONLY "public"."users" 
      ADD COLUMN "name" text,
      ADD COLUMN "phone" text,
      ADD COLUMN "surname" text;
    `);
  }
}
