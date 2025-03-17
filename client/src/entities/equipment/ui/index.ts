export type {
  IAddEquipmentData,
  IEquipmentData as IUpdateEquipmentData,
  EquipmentArrayType,
} from '../model';
export {
  getUserEquipmentThunk,
  getEquipmentThunk,
  addEquipmentThunk,
  updateEquipmentThunk,
  deleteEquipmentThunk,
} from '../api';
export { equipmentsReducer } from '../slice';
