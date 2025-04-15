import { render, screen } from "@testing-library/react";
import Question from "../components/Question";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

const testQuestion = {
  id: 1,
  prompt: "What's 2 + 2?",
  answers: ["3", "4", "5", "22"],
  correctIndex: 1,
};

const noop = () => {};

test("creates an interval with setTimeout", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(screen.getByText(/10 seconds remaining/)).toBeInTheDocument();
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);

  act(() => {
    jest.advanceTimersByTime(1000); // go 1 second
  });

  expect(screen.getByText(/9 seconds remaining/)).toBeInTheDocument();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} onAnswered={onAnswered} />);

  act(() => {
    jest.advanceTimersByTime(10000); // full 10 seconds
  });

  expect(onAnswered).toHaveBeenCalledWith(false);
});

test("clears the timeout after unmount", () => {
  const { unmount } = render(<Question question={testQuestion} onAnswered={noop} />);
  unmount();

  act(() => {
    jest.advanceTimersByTime(5000);
  });

  // Should not throw or call anything after unmount
});
