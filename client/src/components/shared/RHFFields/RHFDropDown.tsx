import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, MenuItem, Select, SelectProps } from "@mui/material";
import React, { ReactNode } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

type Values = {
  value: string | number | null;
  label: string | null;
  color?: string | null;
};

type RHFDropDownProps<T extends FieldValues> = {
  name: string;
  selectProps?: SelectProps;
  multiple?: boolean;
  clearField?: () => void;
  withClearButton?: boolean;
  values: Values[];
  error?: boolean;
  defaultValue: string | number | [] | undefined;
  children?: ReactNode;
} & Pick<ControllerProps<T>, "name" | "control" | "rules">;

const RHFDropDown = <T extends FieldValues>({
  name,
  control,
  selectProps,
  values,
  clearField,
  withClearButton,
  multiple,
  defaultValue,
  error,
  children,
}: RHFDropDownProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Select
        {...selectProps}
        sx={{
          "&:hover .clearButton": {
            opacity: 1,
          },
        }}
        onChange={onChange}
        defaultValue={defaultValue}
        multiple={multiple}
        value={value}
        error={error}
        endAdornment={
          <IconButton
            size="small"
            className="clearButton"
            sx={{
              display: withClearButton && value ? "" : "none",
              right: "1em",
              width: "28px",
              height: "28px",
              opacity: 0,
              backgroundColor: "transparent",
              "& svg": {
                width: "20px",
                height: "20px",
              },
            }}
            onClick={clearField}
          >
            <ClearIcon />
          </IconButton>
        }
      >
        {values!.map((data) => (
          <MenuItem
            key={data.value!}
            value={data.value!}
            sx={{ color: data.color ? data.color : "" }}
          >
            {data.label!}
          </MenuItem>
        ))}

        {children}
      </Select>
    )}
  />
);

export default RHFDropDown;
