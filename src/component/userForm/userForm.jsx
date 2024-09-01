import { useState } from "react";
import { createUser } from "../../services/user";
import "./userForm.css";

export default function userForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === ""
      ) {
        setError("Please fill in all fields");
        setIsSubmitting(false);
      }
      const payload = {
        firstName,
        lastName,
        email,
        password,
      };
      const response = await createUser(payload);
      console.log(response);
      setSuccess('User created successfully');
      setIsSubmitting(false);
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  }

  return (
    <>
        <h1>User Form</h1>
      <form className="userForm" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
                <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>
          Password must contain at least 8 characters, one letter, one number
          and one special character
        </p>
        <button>{isSubmitting ? "Submitting..." : "submit"}</button>
        {error && <span className="error">{error}</span>}
        {success && <span className="success">{success}</span>}
      </form>
    </>
  );
}
