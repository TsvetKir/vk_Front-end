import { useQuery } from "react-query"
import { getFact } from "../../../shared/api"


export const useFactQuery = (
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    isEditing: boolean) => {
    const data = useQuery({
        queryKey: 'fact',
        queryFn: () => getFact(setEditing, isEditing),
        enabled: false
    });
    return data;
}