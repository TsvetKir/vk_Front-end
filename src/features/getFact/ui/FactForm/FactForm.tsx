import { Button, FormItem, Group, Textarea } from "@vkontakte/vkui";
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useFactQuery } from "../../hooks/useFactQuery";
import { findFirtsWord } from "../../lib";


export const FactForm: FC = () => {

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setEditing] = useState<boolean>(false);
    const { refetch } = useFactQuery(setEditing, isEditing);

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setEditing(true);

            refetch()
                .then((newData) => {
                    if (inputRef.current) {
                        inputRef.current.value = newData.data?.fact as string;
                    }
                })
                .catch((error) => console.error("Error:", error))
                .finally(() => setEditing(false));
        },
        [refetch]
    );

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            const pos: number = findFirtsWord(inputRef.current.value);
            inputRef.current.setSelectionRange(pos, pos);
        }
    }, [isEditing]);

    return (
        <Group>
            <form onSubmit={handleSubmit}>
                <FormItem>
                    <Button size='m' type="submit" marginHeight={10}>
                        Получить факт!
                    </Button>
                </FormItem>
                <FormItem>
                    <Textarea getRef={inputRef}/>
                </FormItem>
            </form>
        </Group >
    );
}