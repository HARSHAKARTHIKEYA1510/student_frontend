"use client";
import Link from 'next/link';  
import { useState } from "react";
import {useRouter} from "next/navigation"

export default function Login() {
  const backend_url = process.env.NEXT_PUBLIC_API_URL
  const [userEmail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const router=useRouter()
  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: pass }),
      });
      const res = await data.json();
      setMessage(res.message);
      console.log(res.message);
      if (res.success){
        router.push("/dashboard")
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong!");
    }
  }
  // function handleLogin(){
  //   router.push("/dashboard")
  // }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleClick}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit">Login</button>

          {message && (
            <p className={`login-message ${message.toLowerCase().includes("success") ? "success" : "error"}`}>
              {message}
            </p>
          )}
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link href="/signup" className="signup-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
