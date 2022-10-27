import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import DomainsTable from "../components/domains/view-domains/DomainsTable";
import mockData from "./mockData";

const routerContainer = { wrapper: BrowserRouter };
const router1Container = { wrapper: BrowserRouter };

// JEST FRONT-END TESTING

describe("DomainsTable Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.domains_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Domain", async () => {
    render(<DomainsTable />, routerContainer);
    const message = "Domains";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("StandardsTable Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Standard", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Standards";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Competencies Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Competencies", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Competencies";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Reviewers Card Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Reviewers", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Reviewers";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Login Form Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Login", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Login";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Users Table Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Users", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Users";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Menu Navbar Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Navbar", async () => {
    render(<StandardsTable />, router1Container);
    const message = "";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Sign Up Form Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Sign Up Form", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Sign Up";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Admin Table Component", () => {
  jest.restoreAllMocks();

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Admins", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Admins";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});

describe("Reviewers Table Component", () => {
  jest.restoreAllMocks();
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve(mockData.Standards_table),
    })
  );
  beforeAll(() => {});
  afterAll(cleanup);
  test("should contain word Reviewers", async () => {
    render(<StandardsTable />, router1Container);
    const message = "Reviewers";

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});
