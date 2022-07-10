import { Input } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import { LogIn } from "./LogIn"



describe("Login screen: ", () => {

    const renderLogInScreen = () => {


        return render(
            <BrowserRouter>
                <Provider store={store}>
                    <LogIn />
                </Provider>
            </BrowserRouter>

        );
    }

    it("Should display error message on wrong credentials.",async () => {
        const loginComponent = renderLogInScreen();
        const emailInput =  (await loginComponent.findByTestId("email")).querySelector("input");
        fireEvent.change(emailInput as any, {target:{value: "ahmed@gg.com"}});
        const passwordInput = (await screen.findByTestId("password")).querySelector("input");
        fireEvent.change(passwordInput as any, {target:{value: "ahmed456"}});
        const submitButton = loginComponent.findByTestId("sign-in-button");
        (await submitButton).click();
    })
    it.todo("Should redirect user to home page.")
})