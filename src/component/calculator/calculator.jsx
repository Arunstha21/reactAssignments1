import { useState } from "react";
import "./Calculator.css";

function Button({ title, onClick, isZero }) {
  return (
    <button className={`button ${isZero ? 'zero' : ''}`} onClick={onClick} value={title}>
      {title}
    </button>
  );
}

export default function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [displayValue, setDisplayValue] = useState(0);

  const handleButtonInput = (e) => {
    const value = inputValue + e.target.value;
    setInputValue(value);
    setDisplayValue(value);
  };

  const handleSubmit = () => {
    if (inputValue === "") {
      setError("Please enter a value");
      return;
    }
    if (inputValue.includes("/0")) {
      setError("Division by zero is not allowed");
      return;
    }

    try {
      const evalResult = eval(inputValue);
      if (evalResult === undefined) {
        setError("Invalid expression");
        return;
      }
      setDisplayValue(`${inputValue}\n${evalResult}`);
      setInputValue("");
      setError("");
    } catch (e) {
      setError("Invalid expression");
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (value.length > 20) {
      return;
    }
    if (/^[\d+\-*/.]*$/.test(value)) {
      setInputValue(value);
      setDisplayValue(value);
    }
  };

  const numbers = [1, 2, 3, "/", 4, 5, 6, "*", 7, 8, 9, "-", 0, ".", "+"];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className="calc">
        <textarea
          value={displayValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={4}
          cols={50}
          className="inputBox"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="controlButtons">
          <button className="button clear" onClick={() => {
            setInputValue("");
            setError("");
            setDisplayValue(0);
          }}>
            C
          </button>
          <button className="button equal" onClick={handleSubmit}>
            =
          </button>
        </div>
        <div className="calcButtons">
          {numbers.map((number) => (
            <Button key={number} title={number} onClick={handleButtonInput} isZero={number === 0} />
          ))}
        </div>
      </div>
    </>
  );
}
