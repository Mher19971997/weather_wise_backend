import * as st from 'sequelize-typescript';
import { literal } from 'sequelize';

import { ThroughModel } from '@weather_wise_backend/shared/src/sequelize/through-model';
import { CommonEntity } from '@weather_wise_backend/shared/src/sequelize/common-entity';
import { UUID } from '@weather_wise_backend/shared/src/sequelize/meta';

export class CommonModel<M> extends ThroughModel<M & CommonEntity> {
  @st.Column({
    type: st.DataType.UUID,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v4()'),
  })
  declare uuid: UUID;
}
