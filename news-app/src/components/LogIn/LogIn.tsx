import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { logIn } from "../../features/user/userApi";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { EmailTextField } from "../../shared/components/EmailTextField";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { PasswordTextField } from "../../shared/components/PasswordTextField";

export type userType = {
    email: string,
    password: string
}

export const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useAppSelector(state => state.user.logInError);

    const naviagte = useNavigate()
    const dispatch = useAppDispatch();

    const handleSignInClick = (e: FormEvent<Element>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(logIn({
            email,
            password
        }));

    }

    const handleSignUpClick = async () => {
        naviagte("/authentication/register");
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
                paddingY={8}
                width={{ xs: "75%", md: "40%", lg: "27%" }}
                direction="column"
                spacing={3}
                className="signin-form"
                component="form"
                autoComplete="off"
                onSubmit={(e: FormEvent<Element>) => handleSignInClick(e)}
            >

                <EmailTextField
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    data-testid={"email"}
                    error={error === "" ? false : true}
                />
                <PasswordTextField
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    data-testid={"password"}
                    error={error === "" ? false : true}

                />

                <Button type="submit" variant="contained" data-testid={"sign-in-button"}>Sign In</Button>
                <Button variant="outlined" onClick={handleSignUpClick} >Sign Up</Button>
                {error !== "" && <Alert severity="error">{error}</Alert>}
            </Stack>
        </Box>

    )
}