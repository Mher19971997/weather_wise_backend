import { SequelizeModule } from '@nestjs/sequelize';
import * as st from 'sequelize-typescript';
import s from 'sequelize';
import { CommonModel } from '@weather_wise_backend/shared/src/sequelize/common-model';
import { UserEntity } from '@weather_wise_backend/src/user/dto/output/user.entity';

@st.Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class User extends CommonModel<UserEntity> {
  @st.Column({
    type: st.DataType.STRING,
    unique: true,
  })
  declare email: string;

  @st.Column({
    type: st.DataType.STRING,
  })
  declare name: string;

  @st.Column({
    type: st.DataType.STRING,
  })
  declare phone: string;

  @st.Column({
    type: st.DataType.STRING,
  })
  declare surname: string;

  @st.Column({
    type: st.DataType.STRING,
  })
  declare password: string;

  @st.Column({
    type: st.DataType.STRING,
  })
  declare secret: string;

  @st.Column({
    type: st.DataType.JSONB,
  })
  declare roles: string[];

  @st.Column({
    type: st.DataType.INTEGER,
    defaultValue: s.literal('random_between(1000000,1999999)'),
  })
  declare userId: string;
}

export const UserEntry = SequelizeModule.forFeature([User]);
