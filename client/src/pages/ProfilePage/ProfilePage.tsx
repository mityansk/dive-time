import TourForm from '@/widgets/TourForm/TourForm';
import TourList from '@/widgets/TourList/TourList';
import { ReactElement } from 'react';

export default function ProfilePage(): ReactElement {
  return (
    <div>
      <div>
        Здесь компонент, выводящий кнопку "Добавить снаряжение" и список моего
        снаряжения с кнопками "редактировать/удалить"
      </div>
      <div>
        <TourForm />
        <TourList isProfile={true}/>
      </div>
    </div>
  );
}
