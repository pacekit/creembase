import type { ComponentProps, ReactNode } from "react";

import { AnyFormApi, type DeepKeys, useField } from "@tanstack/react-form";

import { cn } from "@/lib/utils";

import { FormError } from "@/components/shared/forms/FormError";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { GetFormData } from "./helpers";

export type FormInputProps<TForm extends AnyFormApi> = Omit<ComponentProps<"input">, "name" | "form" | "prefix"> & {
    label?: ReactNode;
    form: TForm;
    name: DeepKeys<GetFormData<TForm>>;
    prefix?: ReactNode;
    suffix?: ReactNode;
};

export const FormInput = <TForm extends AnyFormApi>({
    label,
    form,
    name,
    className,
    prefix,
    suffix,
    ...rest
}: FormInputProps<TForm>) => {
    const field = useField({
        form,
        name,
    });

    const errors = field.state.meta.errors[0];

    const error = typeof errors === "object" ? errors.message : errors;

    return (
        <Field data-invalid={error != undefined} className="gap-1.5">
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
            <div className="relative">
                {prefix && <div className="absolute start-3 top-1/2 -translate-y-1/2">{prefix}</div>}
                <Input
                    id={field.name}
                    className={cn({ "ps-10": prefix, "pe-10": suffix, className })}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                        const val = e.target.value;
                        field.handleChange(rest.type === "number" ? Number(val) : val);
                    }}
                    aria-invalid={error != undefined}
                    {...rest}
                />
                {suffix && <div className="absolute end-3 top-1/2 -translate-y-1/2">{suffix}</div>}
            </div>
            <FormError form={form} name={name} className="mt-0.5" />
        </Field>
    );
};
