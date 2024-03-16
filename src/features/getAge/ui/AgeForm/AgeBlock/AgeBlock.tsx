import { Div, FormStatus } from "@vkontakte/vkui";
import { FC } from "react";

interface IAgeBlockProps {
    age: string | undefined
}


export const AgeBlock: FC<IAgeBlockProps> = ({age}) => {
    return (
        <Div>
            <FormStatus header='Полученный ответ'>
                {`Возраст: ${age ? age : age === '' ? '' : 'Имя введено некорректно!'}`}
            </FormStatus>
        </Div>
    );
}