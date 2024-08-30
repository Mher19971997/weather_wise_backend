import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CommonStore } from '../store/CommonStore';

@Injectable()
export class V2_UserRole extends CommonStore {
  private readonly logger = new Logger(V2_UserRole.name);

  constructor(@InjectConnection() private connection: Sequelize) {
    super();
  }

  async up(): Promise<void> {
    await this.connection.query(`
    INSERT INTO "public"."users" ("email", "password", "secret", "roles", "userId") 
    VALUES 
    ('mher.melqonyan.mher123@gmail.com', 'dc354b47cbe6b4c83f5aef48812fd9c075458980f431812e98dfa6b74f501256531c880094bb8a6a7f9be127d31cdf70a784366e0266f6778257515fbead59db4dab8e2854c94d1605c900bbd4c7ec8046625f0465e30342a9c5e7fe0a3fea38dff8f41dffedd8a7ef619c4eb836acf6cf7f72edd1d1a72c24c492e825b36f460bb329f842edb4e8f61691905f673d8403aacc3d610cfd36aa4c5f693ff8f9c7960e28c41420ce21067cfb88fde2e9d88ac7065d2409b229014938a416654e55620545b0823e79a13161a6682be6c74e6c43837f1ad41b4816f7c1bd08d2769269946c4ee60822907d73a3a9a47c3bf92ff05eae53ca3ad0aea522e716744c56f177df263d166740fdeb5ece4fcb56216f7b500ee9f661461967918891c86fd47a05266cccb7dfeca20ebbcabb5127928a5d540c411aac9692f3a7e9c9b66024395c73cdda2d07d3afaffd1c37bef58b7bad05d23012097c26933db7b75e1501ec0040ae9d30a31976d4a1e76bd559fbc28335de7abf1dde0e2b5baf97954dac960667f6ea3fa0d3d869cacc490bcbf595c15e439346385ad315e07743d73bf4482d9ffe7f2bf272efe366c8596bef2c28930535490c65131db5ad377407b7ac8665203c2ea8804745db0877465df05ee3bef05882c7aebf2e6d34b0bdacf63025d17ee50a4518ec0848e86efd64cff12df3b9e90093cb5123801c2a124224c975', 'qwerqyuiqpasdqgqwerghjkmnnbvchjklzqcvbnm1234567890-=[];'',./', '["user"]', 1111111);
    `);
  }
}
