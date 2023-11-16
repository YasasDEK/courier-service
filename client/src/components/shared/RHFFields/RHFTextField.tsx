import { TextField, TextFieldProps } from "@mui/material";
import React, { ChangeEvent } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

type FormInputTextProps<T extends FieldValues> = {
  transform?: {
    input?: (value: any) => any;
    output?: (
      value: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => any;
  };
  defaultHelperText?: string;
} & TextFieldProps &
  Pick<ControllerProps<T>, "name" | "control" | "rules" | "defaultValue">;

export function RHFTextField<T extends FieldValues>(
  props: FormInputTextProps<T>
) {
  const {
    name,
    control,
    rules,
    defaultValue,
    transform,
    defaultHelperText,
    ...others
  } = props;

  // Set up some default transforms that will do nothing to the values.
  let _transform = {
    input: (value: any) => value,
    output: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      event.target.value,
  };

  // If the developer has passed in any transforms, use them.
  if (transform) {
    if (transform.input) {
      _transform.input = transform.input;
    }
    if (transform.output) {
      _transform.output = transform.output;
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <TextField
          name={name}
          onChange={(event) => onChange(_transform.output(event))}
          value={_transform.input(value)}
          onBlur={onBlur}
          error={invalid}
          ref={ref}
          helperText={error?.message || defaultHelperText}
          {...others}
        />
      )}
    />
  );
}
