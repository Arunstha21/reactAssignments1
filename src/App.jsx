import { useState } from "react";
import "./App.css";
import Calculator from "./component/calculator/calculator";
import UserForm from "./component/userForm/userForm";

function App() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const handleShowCalculator = () => {
    setShowCalculator(!showCalculator);
    setShowUserForm(false);
  };
  const handleShowUserForm = () => {
    setShowUserForm(!showUserForm);
    setShowCalculator(false);
  };

  return (
    <>
      <div className="buttons">
        <button onClick={handleShowCalculator}>Calculator</button>
        <button onClick={handleShowUserForm}>User Form</button>
      </div>
      <div>
        {showCalculator && <Calculator />}
        {showUserForm && <UserForm />}
      </div>
    </>
  );
}

export default App;
