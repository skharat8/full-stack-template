import { type ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../../App";

function setup(jsx: ReactElement) {
  // Use setup functions that compose together when you have a lot of tests
  // that do the same thing.
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

// TODO: Explore snapshot testing later
// it("renders main page", () => {
//   const { container } = setup(<App />);
//   expect(container).toMatchSnapshot();
// });

it.skip("renders correct heading", () => {
  setup(<App />);
  expect(screen.getByRole("heading").textContent).toMatch(/Hello World/i);
});

it.skip("increments count after button click", async () => {
  const { user } = setup(<App />);
  const button = screen.getByRole("button", { name: "count 0" });

  await user.click(button);
  expect(button.textContent).toMatch(/^count 1$/i);
});
