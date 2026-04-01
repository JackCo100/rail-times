import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NavBar from "./navBar";

describe("Navbar component", () => {
  it("Top Nav bar should be displayed", () => {
    render(<NavBar />);
    const mainNav = screen.getByText("UK Railway Times");
    expect(mainNav).toBeInTheDocument();
  }
)})