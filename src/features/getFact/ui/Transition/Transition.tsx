import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Button, Div, Group, Header } from "@vkontakte/vkui";
import { FC } from "react";


export const Transition: FC = () => {

    const routeNavigator = useRouteNavigator();

    return (
        <Group header={<Header mode="secondary">Переход ко второму заданию</Header>}>
            <Div>
                <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('getAge')}>
                    Перейти ко второму заданию!
                </Button>
            </Div>
        </Group>
    );
}