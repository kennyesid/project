import React from "react";
import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../services/SignService");
window.alert = jest.fn();

describe("Component SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });

  it("test form correctly", () => {
    render(<SignIn />);

    expect(
      screen.getByRole("heading", { name: /initSession/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/testUnity@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/123456/i)).toBeInTheDocument();
  });
});
