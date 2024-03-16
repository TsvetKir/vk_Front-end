import axios from "axios";
import { IAge } from "../../../type";

export const getAge = async (signal: AbortSignal | undefined, name: string) => {

    const promis = await axios.get<IAge>('https://api.agify.io/', {
      params: { name: name },
      signal: signal,
    });
  
    return promis.data;
  }