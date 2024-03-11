import { FC, useEffect, useState } from 'react';
import { Input, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Div, Group, FormLayoutGroup, FormItem, FormStatus } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { FormValues } from './InputNew';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from 'yup';
import axios from 'axios';


const schema = object({
  name: string().required('Введите имя').matches(/^[a-zA-Za]+$/, 'Только латинские буквы')
})

export const Task2: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const [isAge, setAge] = useState<string>('');
  const [isOldName, setOldName] = useState<string>('');
  const [timer, setTimer] = useState<number | undefined>(undefined);


  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isOldName !== '') {
      if (timer) {
        clearTimeout(timer);
      }

      const controller = new AbortController();
      getAge(isOldName, setAge, controller);
      return () => controller.abort();
    }
  }, [isOldName])


  const getAge = async (name: string,
    setAge: React.Dispatch<React.SetStateAction<string>>,
    controller: AbortController) => {
    await axios.get('https://api.agify.io/', {
      params: { name: name },
      signal: controller.signal
    })
      .then((resp) => {
        setAge(resp.data.age);
        console.log(name)
      })
      .catch((err) => {
        if (err.name === 'CanceledError') {
          console.log('Fetch request aborted');
        }
        else alert(err);
      })
  }

  const onSubmit = (data: FormValues) => {
    setOldName(data.name);
    clearTimeout(timer);
    reset();
  }

  const test = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      onSubmit({name: e.target.value});
    }, 3000))
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Задание 2
      </PanelHeader>
      <Group>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLayoutGroup>
            <FormItem htmlFor='name' top='Имя'>
              <Input
                id='name'
                getRef={register('name').ref}
                onChange={test}
                onBlur={register('name').onBlur}
                name={register('name').name}
                required={register('name').required}
                pattern={register('name').pattern}
                disabled={register('name').disabled}
              />
            </FormItem>
            <Div>
              {errors.name?.message ?
                <FormStatus mode='error'>
                  {errors.name.message}
                </FormStatus>
                :
                <FormStatus header='Полученный ответ'>
                  {`Возраст: ${isAge}`}
                </FormStatus>
              }
            </Div>
            <FormItem>
              <Input type='submit' />
            </FormItem>
          </FormLayoutGroup>
        </form>
      </Group>
    </Panel>
  );
};
