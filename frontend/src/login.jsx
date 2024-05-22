import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Write API call here
    try {
      const loginResponse = await fetch("http://localhost:7000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailID: email,
          password,
        }),
      });

      const loginData = await loginResponse.json()
      if(loginData.status === "failure"){
        alert(loginData.message)
      }else{
          console.log(loginData);
          setCookie('token', loginData.accessToken, { maxAge: 60 * 60 * 60 })
          navigate("/expense")
      }
    } catch (error) {
      console.log("API error");
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form class="formc" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="amount">Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}