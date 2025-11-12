"use client";
import { useState } from "react";
import Link from "next/link";
// import "./signup.css";

export default function Signup() {
  const [useremail, setEmail] = useState("");
  const [userPass, setPass] = useState("");
  const [message, setMessage] = useState("");

  async function handleCreateAcc(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: useremail, password: userPass }),
      });
      const resMsg = await res.json();
      setMessage(resMsg.message);
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong!");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create an Account</h1>
        <form onSubmit={handleCreateAcc} className="signup-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={useremail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={userPass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>

          {message && (
            <p className={`signup-message ${message.toLowerCase().includes("success")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link href="/" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
}
