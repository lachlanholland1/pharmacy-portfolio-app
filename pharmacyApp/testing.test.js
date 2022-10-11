import { render, fireEvent, screen, getByText } from "@testing-library/react";
import SignInForm from "./src/components/sign-in/SignInForm";
import ViewEvidence from "../pharmacyApp/src/components/user/profile/evidence/viewEvidence";
import React, { useState, useEffect } from "react";
import useAuth from "../pharmacyApp/src/hooks/useAuth";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
// const { createMemoryHistory } = require("history");

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <SignInForm />,
      </Router>
    );
    expect(screen.getByRole("button", { name: /Sign In/i }));
    // expect(screen.getAllByText("Sign In")).toBe("Sign In");
  });
});

// describe("(Component) Login", () => {
//   const history = createMemoryHistory();

//   it("Should render all key form elements", () => {
//     render(
//       <Router location={history.location} navigator={history}>
//         <SignInForm />
//       </Router>
//     );
//     const emailInput = screen.getByLabelText("email");
//     const passwordInput = screen.getByTestId("password");
//     // const logInButton = screen.getByTestId("log-in-button");
//     expect(emailInput).toBeInstanceOf(HTMLInputElement);
//     expect(passwordInput).toBeInstanceOf(HTMLInputElement);
//     // expect(logInButton).toBeInstanceOf(HTMLButtonElement);
//   });
// });
