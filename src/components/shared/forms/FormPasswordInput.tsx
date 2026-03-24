import { useState } from "react";

import { AnyFormApi } from "@tanstack/react-form";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FormInput, FormInputProps } from "./FormInput";

type FormPasswordInputProps<TForm extends AnyFormApi> = FormInputProps<TForm> & {};

export const FormPasswordInput = <TForm extends AnyFormApi>({
    prefix,
    suffix,
    ...rest
}: FormPasswordInputProps<TForm>) => {
    const [show, setShow] = useState(false);

    return (
        <FormInput
            {...rest}
            type={show ? "text" : "password"}
            prefix={prefix ?? <LockIcon className="text-muted-foreground size-4.5" />}
            suffix={
                suffix ?? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground rounded-full"
                        onClick={() => setShow(!show)}>
                        {show ? <EyeIcon className="size-4.5" /> : <EyeOffIcon className="size-4.5" />}
                    </Button>
                )
            }
        />
    );
};
