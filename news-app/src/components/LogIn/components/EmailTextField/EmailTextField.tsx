import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { userActions } from "../../../../features/user/userSlice";

 
export const EmailTextField = (props: TextFieldProps)=>{
    const email = useAppSelector(state => state.user.email);
    const error = useAppSelector(state => state.user.error);
    const dispatch = useAppDispatch();
   
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(userActions.setEmail(event.target.value));    
    }

    return (
        <TextField
        {...props}
        value={email}
        onChange={(event)=> handleChange(event)}
        id="user-email"
        label="Email"
        type={"email"}
        multiline
        autoFocus
        error = {error === ""? false:true}
    />
    )
}