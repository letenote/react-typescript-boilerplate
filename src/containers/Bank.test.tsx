import React from "react";
import { render, screen } from '../test-utils';
import Bank from "./Bank";
import userEvent from '@testing-library/user-event'

describe("__BANK_RENDER", () => {
  it('should render and onChange handler in #moneyFormInput', async () => {
    render(<Bank/>)
    const input = screen.getByTestId("moneyFormInput")
    const expected_value = '1'
    userEvent.type(input, expected_value)
    expect(input).toHaveValue(expected_value);
  });
})