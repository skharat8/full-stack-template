import { test } from "vitest";
import userEvent from "@testing-library/user-event";

// TODO: Modify ErrorPage and write some tests
function setup() {
  // Use setup functions that compose together when you have a lot of tests
  // that do the same thing.
  return {
    user: userEvent.setup(),
  };
}

test("empty", () => {
  setup();
});
