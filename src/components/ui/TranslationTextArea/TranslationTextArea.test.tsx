/**
 * @fileoverview TranslationTextArea Component Test Suite
 *
 * Comprehensive tests for the TranslationTextArea component including
 * input/output modes, audio functionality, and accessibility features.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { starTrekThemes } from "../../../theme/starTrekTheme/starTrekTheme";
import TranslationTextArea from "./TranslationTextArea";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={starTrekThemes.tos}>{component}</ThemeProvider>,
  );
};

describe("TranslationTextArea", () => {
  const mockProps = {
    value: "",
    placeholder: "Enter text...",
    isInput: true,
  };

  describe("Input Mode", () => {
    it("renders as input field when isInput is true", () => {
      const onChange = vi.fn();
      renderWithTheme(
        <TranslationTextArea {...mockProps} onChange={onChange} />,
      );

      const textField = screen.getByRole("textbox");
      expect(textField).toBeInTheDocument();
      expect(textField).not.toHaveAttribute("readonly");
    });

    it("calls onChange when text is typed", () => {
      const onChange = vi.fn();
      renderWithTheme(
        <TranslationTextArea {...mockProps} onChange={onChange} />,
      );

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "Hello world" } });

      expect(onChange).toHaveBeenCalledWith("Hello world");
    });

    it("shows clear button when onClear is provided and value exists", () => {
      const onClear = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value="some text"
          onClear={onClear}
        />,
      );

      const clearButton = screen.getByLabelText("Clear text");
      expect(clearButton).toBeInTheDocument();

      fireEvent.click(clearButton);
      expect(onClear).toHaveBeenCalled();
    });

    it("does not show clear button when value is empty", () => {
      const onClear = vi.fn();
      renderWithTheme(
        <TranslationTextArea {...mockProps} value="" onClear={onClear} />,
      );

      const clearButton = screen.queryByLabelText("Clear text");
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe("Output Mode", () => {
    it("renders as readonly when isInput is false", () => {
      renderWithTheme(<TranslationTextArea {...mockProps} isInput={false} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toHaveAttribute("readonly");
    });

    it("does not show clear button in output mode", () => {
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          isInput={false}
          value="some text"
        />,
      );

      const clearButton = screen.queryByLabelText("Clear text");
      expect(clearButton).not.toBeInTheDocument();
    });

    it("does not call onChange in output mode", () => {
      const onChange = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          isInput={false}
          onChange={onChange}
        />,
      );

      const textField = screen.getByRole("textbox");
      fireEvent.change(textField, { target: { value: "Hello world" } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("Audio Functionality", () => {
    it("shows audio button when value exists and audioSupported is true", () => {
      const onPlayAudio = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value="some text"
          onPlayAudio={onPlayAudio}
          audioSupported={true}
        />,
      );

      const audioButton = screen.getByLabelText("Play audio");
      expect(audioButton).toBeInTheDocument();
    });

    it("calls onPlayAudio when audio button is clicked", () => {
      const onPlayAudio = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value="some text"
          onPlayAudio={onPlayAudio}
          audioSupported={true}
        />,
      );

      const audioButton = screen.getByLabelText("Play audio");
      fireEvent.click(audioButton);

      expect(onPlayAudio).toHaveBeenCalled();
    });

    it("disables audio button when isPlaying is true", () => {
      const onPlayAudio = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value="some text"
          onPlayAudio={onPlayAudio}
          audioSupported={true}
          isPlaying={true}
        />,
      );

      const audioButton = screen.getByLabelText("Play audio");
      expect(audioButton).toBeDisabled();
    });

    it("does not show audio button when audioSupported is false", () => {
      const onPlayAudio = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value="some text"
          onPlayAudio={onPlayAudio}
          audioSupported={false}
        />,
      );

      const audioButton = screen.queryByLabelText("Play audio");
      expect(audioButton).not.toBeInTheDocument();
    });

    it("does not show audio button when value is empty", () => {
      const onPlayAudio = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value=""
          onPlayAudio={onPlayAudio}
          audioSupported={true}
        />,
      );

      const audioButton = screen.queryByLabelText("Play audio");
      expect(audioButton).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("shows error state when error prop is true", () => {
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          error={true}
          helperText="Error message"
        />,
      );

      const textField = screen.getByRole("textbox");
      expect(textField).toHaveAttribute("aria-invalid", "true");

      const helperText = screen.getByText("Error message");
      expect(helperText).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("displays the correct value", () => {
      const testValue = "Test translation text";
      renderWithTheme(<TranslationTextArea {...mockProps} value={testValue} />);

      const textField = screen.getByRole("textbox");
      expect(textField).toHaveValue(testValue);
    });

    it("shows the correct placeholder", () => {
      const placeholder = "Custom placeholder";
      renderWithTheme(
        <TranslationTextArea {...mockProps} placeholder={placeholder} />,
      );

      const textField = screen.getByPlaceholderText(placeholder);
      expect(textField).toBeInTheDocument();
    });

    it("handles multiline text properly", () => {
      const multilineText = "Line 1\nLine 2\nLine 3";
      renderWithTheme(
        <TranslationTextArea {...mockProps} value={multilineText} />,
      );

      const textField = screen.getByRole("textbox");
      expect(textField).toHaveValue(multilineText);
    });
  });

  describe("Accessibility", () => {
    it("supports keyboard navigation", () => {
      const onChange = vi.fn();
      renderWithTheme(
        <TranslationTextArea {...mockProps} onChange={onChange} />,
      );

      const textField = screen.getByRole("textbox");
      textField.focus();
      expect(textField).toHaveFocus();
    });

    it("has proper tooltip labels on buttons", () => {
      const onPlayAudio = vi.fn();
      const onClear = vi.fn();
      renderWithTheme(
        <TranslationTextArea
          {...mockProps}
          value="some text"
          onPlayAudio={onPlayAudio}
          onClear={onClear}
        />,
      );

      expect(screen.getByLabelText("Play audio")).toBeInTheDocument();
      expect(screen.getByLabelText("Clear text")).toBeInTheDocument();
    });
  });
});
