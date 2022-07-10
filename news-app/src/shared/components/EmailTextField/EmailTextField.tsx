import { TextField, TextFieldProps } from "@mui/material";
 
export const EmailTextField = (props: TextFieldProps)=>{

    return (
        <TextField
        {...props}
        required
        id="user-email"
        label="Email"
        type={"email"}
        autoFocus
    />
    )
}