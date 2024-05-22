import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "./App";

function setup(jsx: ReactElement) {
  // Use setup functions that compose together when you have a lot of tests
  // that do the same thing.
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

test("renders main page", () => {
  const { container } = setup(<App />);
  expect(container).toMatchSnapshot();
});

test("renders correct heading", () => {
  setup(<App title="Hello World" />);
  expect(screen.getByRole("heading").textContent).toMatch(/Hello World/i);
});

test("increments count after button click", async () => {
  const { user } = setup(<App />);
  const button = screen.getByRole("button", { name: "count 0" });

  await user.click(button);
  expect(button.textContent).toMatch(/^count 1$/i);
});
