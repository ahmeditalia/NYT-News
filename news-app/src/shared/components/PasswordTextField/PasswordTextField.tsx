import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, OutlinedInputProps } from "@mui/material";
import { useState } from "react";

export const PasswordTextField = ({ placeholder, ...props }: OutlinedInputProps) => {

  const [show, setShow] = useState(false);


  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl

      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
      <OutlinedInput
        {...props}
        type={show ? 'text' : 'password'}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"

            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={placeholder}
      />
    </FormControl>
  )
}