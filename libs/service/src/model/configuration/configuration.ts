import { SequelizeModule } from '@nestjs/sequelize';
import * as st from 'sequelize-typescript';

import { literal } from 'sequelize';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';
import { ConfigurationOutput } from '@weather_wise_backend/src/configuration/dto/output/configuration.output';

@st.Table({
  tableName: 'configurations',
  modelName: 'Configuration',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class Configuration extends st.Model<ConfigurationOutput> {
  @st.Column({
    type: st.DataType.UUID,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v4()'),
  })
  declare uuid: UUID;

  @st.Column({ type: st.DataType.STRING })
  declare module: string;

  @st.Column({ type: st.DataType.STRING })
  declare name: string;

  @st.Column({ type: st.DataType.JSONB })
  declare value: any;

  @st.Column({ type: st.DataType.DATE })
  declare createdAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare updatedAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare deletedAt: Date;
}

export const ConfigurationEntry = SequelizeModule.forFeature([Configuration]);
