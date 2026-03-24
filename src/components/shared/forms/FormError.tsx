import type { InputHTMLAttributes } from "react";

import { AnyFormApi, type DeepKeys, useField } from "@tanstack/react-form";

import { cn } from "@/lib/utils";

import { GetFormData } from "./helpers";

export type FormErrorProps<TForm extends AnyFormApi> = Omit<
    InputHTMLAttributes<HTMLParagraphElement>,
    "name" | "form"
> & {
    form: TForm;
    name: DeepKeys<GetFormData<TForm>>;
};

export const FormError = <TForm extends AnyFormApi>({ form, name = "", className, ...rest }: FormErrorProps<TForm>) => {
    const field = useField({
        form,
        name,
    });

    const errors = field.state.meta.errors[0];
    const error = typeof errors === "object" ? errors.message : errors;

    return (
        <>
            {error && (
                <p {...rest} className={cn("text-destructive text-sm", className)}>
                    {error}
                </p>
            )}
        </>
    );
};
