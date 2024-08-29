import { SequelizeModule } from '@nestjs/sequelize';
import * as st from 'sequelize-typescript';

import { CommonModel } from '@weather_wise_backend/shared/src/sequelize/common-model';
import { ContactEntity } from '@weather_wise_backend/src/worker/contact/dto/output/contact.entity';

@st.Table({
  tableName: 'contacts',
  modelName: 'Contact',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class Contact extends CommonModel<ContactEntity> {
  @st.Column({ type: st.DataType.STRING })
  declare value: string;

  @st.Column({ type: st.DataType.STRING })
  declare type: string;

  @st.Column({ type: st.DataType.JSONB })
  declare info: any;

  @st.Column({ type: st.DataType.STRING })
  declare code: string;

  @st.Column({ type: st.DataType.STRING })
  declare status: string;
}

export const ContactEntry = SequelizeModule.forFeature([Contact]);
