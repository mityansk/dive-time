import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { useEffect } from 'react';
import { getEquipmentThunk } from '@/entities/equipment/api/index';

export default function EquipmentList() {
  const equipments = useAppSelector((state) => state.equipments.equipments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEquipmentThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Список снаряжения</h1>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            <div>
              <h2>{equipment.name}</h2>
              <p>{equipment.description}</p>
              <p>Цена: {equipment.price}</p>
              <p>Статус: {equipment.isRented ? 'Арендовано' : 'Доступно'}</p>
              {/* <button onClick={() => handleGoToEquipment(equipment.id)}>Подробнее</button> */}
              {/* <button onClick={() => handleDelete(equipment.id)}>Удалить</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
