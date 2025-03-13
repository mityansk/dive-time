export type {
  IAddEquipmentData,
  IUpdateEquipmentData,
  EquipmentArrayType,
} from "../model";
export {
  getEquipmentThunk,
  addEquipmentThunk,
  updateEquipmentThunk,
  deleteEquipmentThunk,
} from "../api";
export { equipmentsReducer } from "../slice";
