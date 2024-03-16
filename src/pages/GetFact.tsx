import { FC } from 'react';
import { Panel, PanelHeader, NavIdProps } from '@vkontakte/vkui';
import { FactForm } from '../features/getFact/ui/FactForm';
import { Transition } from '../features/getFact/ui/Transition';

export const GetFact: FC<NavIdProps> = ({ id }) => {

  return (
    <Panel id={id}>
      <PanelHeader>Задание 1</PanelHeader>
      <FactForm />
      <div></div>
      <Transition />
    </Panel>
  );
};
