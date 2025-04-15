import React, { useEffect, useState } from "react";
import '@testing-library/jest-dom';


function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((time) => {
        if (time === 1) {
          clearInterval(timer);
          onAnswered(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onAnswered]);

  if (!question) return <p>Loading...</p>;

  const { prompt, answers } = question;

  return (
    <div className="question">
      <h2>{prompt}</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;
