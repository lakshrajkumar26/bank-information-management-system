import React, { useState } from 'react';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  username: z.string().min(3, "Username required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      alert("❌ Invalid input. Username or password is too short.");
      return;
    }

    // If validation passed
    console.log("✅ Valid Form:", result.data);
    alert("✅ Login successful! (form validated)");
    // 🔜 Call backend API here
  };

  return (
    <div className="main-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="username-input">
          <label>Username</label>
          <input
            value={formData.username}
            placeholder="Enter your username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div className="password-input">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
