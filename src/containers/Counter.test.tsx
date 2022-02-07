import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("Counter Render", () => {
  render(<Counter title="COUNTER"/>);
  const text = screen.getByText("Implement State");
  expect(text).toBeInTheDocument();
});