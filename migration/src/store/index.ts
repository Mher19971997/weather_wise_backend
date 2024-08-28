import { V1_InitialScripts } from './V1_InitialScripts.service';
import { V2_UserRole } from './V2_UserRole.service';
import { V3_CreateContactTable } from './V3_CreateContactTable.service';
import { V8_AlterTables } from './V8_AlterTables.service';
// ------

export const Migration = Symbol('Migration');
export const stores: any[] = [
  { provide: Migration, useClass: V1_InitialScripts, multi: true },
  { provide: Migration, useClass: V2_UserRole, multi: true },
  { provide: Migration, useClass: V3_CreateContactTable, multi: true },
  { provide: Migration, useClass: V8_AlterTables, multi: true },
];