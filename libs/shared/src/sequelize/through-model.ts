import * as st from 'sequelize-typescript';
import { CommonEntity } from '@weather_wise_backend/shared/src/sequelize/common-entity';

export class ThroughModel<M> extends st.Model<M & CommonEntity> {
  @st.Column({ type: st.DataType.DATE })
  declare createdAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare updatedAt: Date;

  @st.Column({ type: st.DataType.DATE })
  declare deletedAt: Date;
}
