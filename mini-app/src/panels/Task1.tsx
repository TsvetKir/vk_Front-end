import { FC, useEffect, useRef, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Div,
  NavIdProps,
  Input,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import axios from 'axios';
// import { useQuery } from 'react-query';


export const Task1: FC<NavIdProps> = ({ id }) => {

  const routeNavigator = useRouteNavigator();

  const [value, setValue] = useState<string>('');
  const [isEditing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value && inputRef.current) {
      inputRef.current.focus();
      const pos: number = inputRef.current.value.indexOf(' ');
      inputRef.current.setSelectionRange(pos, pos);
    }
  }, [isEditing]);

  async function getFact(setS: React.Dispatch<React.SetStateAction<string>>,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>, isEditing: boolean) {
    await axios.get('https://catfact.ninja/fact')
      .then((resp) => {
        setS(resp.data.fact);
        setEditing(!isEditing);
      })
      .catch((err) => {
        alert(err);
      })
  }

  return (
    <Panel id={id}>
      <PanelHeader>Задание 1</PanelHeader>
      <Group>
        <Div>
          <Button size='m' onClick={() => getFact(setValue, setEditing, isEditing)} marginHeight={10}>
            Получить факт!
          </Button>
        </Div>
        <Div>
          <Input value={value} onChange={e => { setValue(e.target.value) }} getRef={inputRef} />
        </Div>
      </Group>

      <Group header={<Header mode="secondary">Переход ко второму заданию</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('task2')}>
            Перейти ко второму заданию!
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
