import axios from "axios";
import { IFact } from "../../../type";

export const getFact = async (setEditing: React.Dispatch<React.SetStateAction<boolean>>, isEditing: boolean) => {
    const { data } = await axios.get<IFact>('https://catfact.ninja/fact');
    setEditing(!isEditing);
    return data;
}