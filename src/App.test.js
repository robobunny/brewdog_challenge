import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders", () => {
  render(<App />);
  const header = screen.getByText("Beer Info");
  const footer = screen.getByText("Made by Billy Duraney");
  expect(header).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
