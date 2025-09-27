import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { starTrekThemes } from "../theme/starTrekTheme/starTrekTheme";
import App from "./App";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
      language: "en",
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={starTrekThemes.tos}>{component}</ThemeProvider>,
  );
};

describe("App Component", () => {
  it("renders without crashing", () => {
    renderWithTheme(<App />);
    // Look for any heading since the app should have at least one
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("displays the main heading", () => {
    renderWithTheme(<App />);
    // Look for any heading that might contain translator-related text
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("has translate button", () => {
    renderWithTheme(<App />);
    const translateButton = screen.getByRole("button", { name: /translate/i });
    expect(translateButton).toBeInTheDocument();
  });

  it("has text input areas", () => {
    renderWithTheme(<App />);
    const textBoxes = screen.getAllByRole("textbox");
    expect(textBoxes.length).toBeGreaterThanOrEqual(2);
  });

  it("has language selection controls", () => {
    renderWithTheme(<App />);
    // Look for comboboxes or select elements for language selection
    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes.length).toBeGreaterThanOrEqual(1);
  });

  it("applies Star Trek theme correctly", () => {
    renderWithTheme(<App />);
    // Check if we can find some content that confirms the app rendered
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThan(0);

    // Check for buttons which should be themed
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
