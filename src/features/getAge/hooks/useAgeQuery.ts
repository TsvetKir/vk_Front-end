import { useQuery } from "react-query"
import { getAge } from "../../../shared/api"


export const useAgeQuery = (name: string) => {
    const data = useQuery({
        queryKey: 'age',
        queryFn: ({ signal }) => getAge(signal, name),
        enabled: false,
    });
    return data;
}