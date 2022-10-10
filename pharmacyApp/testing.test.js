import { render, fireEvent, screen } from "@testing-library/react";
import SignInForm from "./src/components/sign-in/SignInForm";
import ViewEvidence from "../pharmacyApp/src/components/user/profile/evidence/viewEvidence";
import React, { useState, useEffect } from "react";
import useAuth from "../pharmacyApp/src/hooks/useAuth";
import { Router, Route } from "react-router-dom";
const { createMemoryHistory } = require("history");

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

describe("(Component) Login", () => {
  const history = createMemoryHistory();

  it("Should render all key form elements", () => {
    render(
      <Router location={history.location} navigator={history}>
        <SignInForm />
      </Router>
    );
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByTestId("password");
    // const logInButton = screen.getByTestId("log-in-button");
    expect(emailInput).toBeInstanceOf(HTMLInputElement);
    expect(passwordInput).toBeInstanceOf(HTMLInputElement);
    // expect(logInButton).toBeInstanceOf(HTMLButtonElement);
  });
});
