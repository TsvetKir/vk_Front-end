import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";


const schema = object().shape({
    name: string()
      .required('Введите имя')
      .matches(/^[a-zA-Za]+$/, 'Только латинские буквы')
  })

export const useAgeForm = () => {
    return useForm({
        defaultValues: {
            name: "",
        },
        resolver: yupResolver(schema),
    })
};