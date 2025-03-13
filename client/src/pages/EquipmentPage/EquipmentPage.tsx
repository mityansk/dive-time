// import { TaskForm } from '@/widgets/TaskForm/TaskForm';
import EquipmentList from "@/widgets/EquipmentList/EquipmentList";
import { JSX, useState, Suspense } from "react";

export function EquipmentPage(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>button</button>
      {/* <TaskForm /> */}
      <Suspense fallback={<div>Загрузка....</div>}>
        <EquipmentList />
      </Suspense>
    </>
  );
}
