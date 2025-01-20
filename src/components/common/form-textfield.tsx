import React from "react";
import TextField from "@mui/material/TextField";

interface FormTextFieldProps {
  margin?: "none" | "dense" | "normal";
  required?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  name: string;
  autoComplete?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  inputLabelColor?: string;
  autoFocus?: boolean;
  sx?: object;
  value: string;
  InputProps?: object; // Lägg till InputProps här
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  margin = "normal",
  required = false,
  fullWidth = true,
  id,
  label,
  name,
  autoComplete = "off",
  type = "text",
  onChange,
  error = false,
  helperText = "",
  size = "medium",
  inputLabelColor,
  autoFocus = false,
  sx,
  value,
  InputProps, // Lägg till InputProps här
}) => {
  return (
    <TextField
      margin={margin}
      required={required}
      fullWidth={fullWidth}
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      type={type}
      onChange={onChange}
      helperText={helperText}
      size={size}
      autoFocus={autoFocus}
      sx={sx}
      value={value}
      InputProps={InputProps} // Lägg till InputProps här
      slotProps={{
        inputLabel: {
          style: { color: error ? inputLabelColor : undefined },
        },
      }}
    />
  );
};

export default FormTextField;
