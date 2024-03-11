import { FC } from "react";
import { useController, UseControllerProps} from "react-hook-form";

export type FormValues = {
    name: string
}

// interface IInputNewProps {
//     props: UseControllerProps<FormValues>,
//     name: string,
// }

export function InputNew(props: UseControllerProps<FormValues>){
    const {field, fieldState} = useController(props);
    return (
        <div>
          <input {...field} placeholder={props.name} />
          <p>{fieldState.isTouched && "Touched"}</p>
          <p>{fieldState.isDirty && "Dirty"}</p>
          <p>{fieldState.invalid ? "invalid" : "valid"}</p>
        </div>
      );
}