import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe('__COUNTER_RENDER', () => {
  it("should get by text: 'Implement State'", () => {
    render(<Counter title="COUNTER"/>);
    const text = screen.getByText("Implement State");
    expect(text).toBeInTheDocument();
  });
});