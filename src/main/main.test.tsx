import { describe, it, expect, vi, beforeEach } from "vitest";
import { StrictMode } from "react";

// Mock React DOM client
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock("react-dom/client", () => ({
  createRoot: mockCreateRoot,
}));

// Mock the App component
vi.mock("./App.tsx", () => ({
  default: () => "Mocked App",
}));

// Mock CSS import
vi.mock("./index.css", () => ({}));

describe("main.tsx", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Mock document.getElementById
    const mockElement = document.createElement("div");
    mockElement.id = "root";
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);
  });

  it("should create root and render the App component", async () => {
    // Import main.tsx to execute the code
    await import("./main.tsx");

    // Verify that getElementById was called with 'root'
    expect(document.getElementById).toHaveBeenCalledWith("root");

    // Verify that createRoot was called with the root element
    expect(mockCreateRoot).toHaveBeenCalledWith(expect.any(Element));

    // Verify that render was called with StrictMode wrapping App
    expect(mockRender).toHaveBeenCalledTimes(1);

    // Get the rendered component
    const renderedComponent = mockRender.mock.calls[0][0];

    // Verify it's wrapped in StrictMode
    expect(renderedComponent.type).toBe(StrictMode);

    // Verify the App component is the child (it's a function component, so check the type)
    expect(renderedComponent.props.children).toBeTruthy();
    expect(typeof renderedComponent.props.children.type).toBe("function");
  });
});
