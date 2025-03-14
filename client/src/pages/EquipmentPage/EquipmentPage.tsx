import EquipmentList from '@/widgets/EquipmentList/EquipmentList';
import { JSX, Suspense } from 'react';

export function EquipmentPage(): JSX.Element {
  return (
    <>
      <Suspense fallback={<div>Загрузка....</div>}>
        <EquipmentList />
      </Suspense>
    </>
  );
}
