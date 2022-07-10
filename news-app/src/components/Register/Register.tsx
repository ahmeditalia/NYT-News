import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { EmailTextField } from "../../shared/components/EmailTextField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordTextField } from "../../shared/components/PasswordTextField";
import { register } from "../../features/user/userApi";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [valid, setValid] = useState(true);
    const error = useAppSelector(state => state.user.regError);

    const dispatch = useAppDispatch();
    const naviagte = useNavigate()


    const handleSignUpClick = async (e: FormEvent<Element>) => {
        e.preventDefault();
        e.stopPropagation();
        if(valid){
            dispatch(register({
                email,
                password
            }));
        }
        
    }

    useEffect(()=>{
        checkValidation();
    }, [password,confirmPassword])

    const checkValidation = () => {
        password == confirmPassword? setValid(true): setValid(false);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setPassword(event.target.value);
    }

    
    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setConfirmPassword(event.target.value);
    }


    const handleSignInClick = async () => {
        naviagte("/authentication/login");
    }
    return (
        <Box
            paddingTop={15}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}

        >
            <Typography variant="h4" component={'h4'}>Sign Up</Typography>
            <Stack
                paddingY={8}
                width={{ xs: "75%", md: "40%", lg: "27%" }}
                direction="column"
                spacing={3}
                className="signin-form"
                component="form"
                autoComplete="off"
                onSubmit={(e: FormEvent<Element>) => handleSignUpClick(e)}
            >
                <EmailTextField
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error = {error === ""? false:true}
                />
                <PasswordTextField
                    placeholder="Password" value={password}
                    onChange={(event) => handlePasswordChange(event)}
                    onBlur={checkValidation}
                    error = {error === ""? false:true}
                />
                <PasswordTextField
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => handleConfirmPasswordChange(event)}
                    onBlur={checkValidation}  
                    error = {error === ""? false:true}
                />
                

                <Button type="submit" variant="contained">Sign Up</Button>
                <Button variant="outlined" onClick={handleSignInClick} >Sign In</Button>
                {error !== "" && <Alert severity="error">{error}</Alert>}
                {!valid && <Alert severity="error">{"Passwords doesn't match."}</Alert>}

            </Stack>
        </Box>

    )
}