import { FormItem, FormLayoutGroup, Group, Input } from "@vkontakte/vkui";
import { FC, useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAgeForm, useAgeQuery } from "../../hooks";
import { Controller } from "react-hook-form";
import { AgeBlock } from "./AgeBlock/AgeBlock";
import "./AgeForm.css";


export const AgeForm: FC = () => {

    const [isName, setIsName] = useState<string>('');
    const [isAge, setIsAge] = useState<string | undefined>('');
    const queryCliente = useQueryClient();
    const { control, handleSubmit, watch, reset } = useAgeForm();
    const watchCurrentName = watch("name") || "";
    const { refetch } = useAgeQuery(watchCurrentName);

    const onSubmit = useCallback(async () => {
        if (isName !== watchCurrentName) {
            queryCliente.cancelQueries({ queryKey: 'age' });
            refetch()
                .then((resp) => {
                    setIsName(watchCurrentName);
                    setIsAge(resp.data?.age);
                });
            reset();
        }
    }, [isName, watchCurrentName, queryCliente, refetch, setIsAge, reset]);

    useEffect(() => {
        let timer: number;
        if (watchCurrentName) {
            timer = setTimeout(() => {
                handleSubmit(onSubmit)();
            }, 3000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }

    }, [handleSubmit, watchCurrentName, onSubmit]);

    return (
        <Group>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLayoutGroup>
                    <FormItem htmlFor='name' top='Имя'>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <Input
                                        id="name"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                    />
                                    {fieldState.error && (
                                        <div className="ErrorValidation">
                                            {fieldState.error.message}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </FormItem>
                    <AgeBlock age={isAge} />
                    <FormItem>
                        <Input type='submit' />
                    </FormItem>
                </FormLayoutGroup>
            </form>
        </Group>
    );
}