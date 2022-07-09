import { Box, Button, Stack, Typography } from "@mui/material";
import { logIn, register } from "../../features/user/userApi";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {EmailTextField} from "./components/EmailTextField";
import {PasswordTextField} from "./components/PasswordTextField";
import { useNavigate } from "react-router-dom";

export type userType = {
    email: string,
    password: string
}

export const LogIn = () => {

    const user: userType = useAppSelector(state => {
        return {
            email: state.user.email,
            password: state.user.password
        }
    });
    const dispatch = useAppDispatch();

    const handleSignInClick = ()=>{
        dispatch(logIn(user));

    }

    const handleSignUpClick = async ()=>{
        dispatch(register(user));
    }
    

    return (
        <Box
            paddingTop={15}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}

        >
            <Typography variant="h4" component={'h4'}>Sign In</Typography>
            <Stack
                padding={8}
                width={{ xs: "80%", md: "40%", lg: "27%" }}
                direction="column"
                spacing={3}
                className="signin-form"
                component="form"
                autoComplete="off"
            >
                <EmailTextField />
                <PasswordTextField />

                <Button variant="contained" onClick={handleSignInClick}>Sign In</Button>
                <Button variant="outlined" onClick={handleSignUpClick} >Sign Up</Button>
            </Stack>
        </Box>

    )
}