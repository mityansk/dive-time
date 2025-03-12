import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect } from "react";
import { getEquipmentThunk } from "@/entities/equipment/api/index";

export default function EquipmentList() {
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEquipmentThunk());
  }, [dispatch]);

  return (
    <div>
      {/* {equipments.map((equipment:) => (
        // <TaskCard key={task.id} task={task} />
      ))} */}
    </div>
  );
}
