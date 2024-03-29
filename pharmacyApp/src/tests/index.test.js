import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import DomainsTable from "../components/domains/view-domains/DomainsTable";
import StandardsTable from "../components/standards/view-standards/StandardsTable";
import mockData from "./mockData";
// 9. ADD YOUR REACT ELEMENT YOUR TESTING
const routerContainer = { wrapper: BrowserRouter };
const router1Container = { wrapper: BrowserRouter };

// 3. COPY FROM HERE...
//5. RENAME YOUR TEST NAME HERE
describe("DomainsTable Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.domains_table), // 6. CHANGE TO BE NEW MOCK DATA NAME
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Domain", async () => {
    // 7. CHANGE DESCRIPTION
    render(<DomainsTable />, routerContainer); // 8. CHANGE REACT ELEMENT YOU ARE TESTING. SEE 9 ABOVE ^
    const message = "Domains"; // 10. CHANGE HOW YOU TEST REACT ELEMENTS LOADED. THIS JUST TESTS FOR WORD "Domains"

    expect(await screen.findByText(message)).toBeInTheDocument(); // 11. THIS AWAITS UNTIL PAGE LOADED AND CHECKS IF FOUND
  });
});

describe("StandardsTable Component", () => {
    jest.restoreAllMocks();
  
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve(mockData.Standards_table), // 6. CHANGE TO BE NEW MOCK DATA NAME
      })
    );
    beforeAll(() => {});
    afterAll(cleanup);
    test("should contain word Standard", async () => {
      // 7. CHANGE DESCRIPTION
      render(<StandardsTable />, router1Container); // 8. CHANGE REACT ELEMENT YOU ARE TESTING. SEE 9 ABOVE ^
      const message = "Standards"; // 10. CHANGE HOW YOU TEST REACT ELEMENTS LOADED. THIS JUST TESTS FOR WORD "Standards"
  
      expect(await screen.findByText(message)).toBeInTheDocument(); // 11. THIS AWAITS UNTIL PAGE LOADED AND CHECKS IF FOUND
    });
  });


// 3. cont. ...TO HERE

// 12. !!!!TO RUN: IN PHARMACY APP FOLDER IN COMMAND LINE TYPE COMMAND: npm test

//13. FINAL NOTE: You may run into issues depending on the component and what it requires. 
//Try and google the fix. 
//If get stuck I can help. 
//For simple tests to begin with you can just test that a word is rendered in the component like I have with "Domains"

