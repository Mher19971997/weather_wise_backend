import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CommonStore } from '../store/CommonStore';

@Injectable()
export class V3_UserRole extends CommonStore {
  private readonly logger = new Logger(V3_UserRole.name);

  constructor(@InjectConnection() private connection: Sequelize) {
    super();
  }

  async up(): Promise<void> {
    await this.connection.query(`
    INSERT INTO "public"."configurations" ("module", "name", "value") 
    VALUES
    ('user', 'role', '{"access": ["user"], "operation": "GET:/api/v1/user/profile"}'),
    ('user', 'role', '{"access": ["user"], "operation": "GET:/api/v1/user"}');
    `);
  }
}
