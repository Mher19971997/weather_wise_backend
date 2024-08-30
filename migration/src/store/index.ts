import { V1_InitialScripts } from './V1_InitialScripts.service';
import { V2_UserRole } from './V2_UserRole.service';
import { V3_UserRole } from './V3_UserRole.service';
// ------

export const Migration = Symbol('Migration');
export const stores: any[] = [
  { provide: Migration, useClass: V1_InitialScripts, multi: true },
  { provide: Migration, useClass: V2_UserRole, multi: true },
  { provide: Migration, useClass: V3_UserRole, multi: true },
];