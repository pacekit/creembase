import { AnyFormApi, DeepKeys, type FormApi } from "@tanstack/react-form";

export type GetFormData<TForm> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TForm extends FormApi<infer TData, any, any, any, any, any, any, any, any, any, any, any> ? TData : never;

export const setFieldError = <TForm extends AnyFormApi>(
    form: TForm,
    field: DeepKeys<GetFormData<TForm>>,
    error: string,
) => {
    form.setFieldMeta(field, (prev) => ({
        ...prev,
        errorMap: {
            ...prev.errorMap,
            onSubmit: error,
        },
    }));
};

export const clearFormErrors = <TForm extends AnyFormApi>(form: TForm) => {
    form.setErrorMap({ onDynamic: { fields: {} } });
};
