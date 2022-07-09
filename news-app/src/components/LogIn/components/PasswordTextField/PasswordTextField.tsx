import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, OutlinedInputProps } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { userActions } from "../../../../features/user/userSlice";

export const PasswordTextField = (props: OutlinedInputProps)=>{

    const [show,setShow] =  useState(false);
    const password = useAppSelector(state => state.user.password);
    const error = useAppSelector(state => state.user.error);

    const dispatch = useAppDispatch();
   
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(userActions.setPassword(event.target.value));
    }


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
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          value={password}
          onChange={(event)=> handleChange(event)}
          type={show ? 'text' : 'password'}
          required
          error = {error === ""? false:true}
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
          label="Password"
        />
      </FormControl>
    )
}