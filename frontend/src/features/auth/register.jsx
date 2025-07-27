import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';

//  Zod schema
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"], {
    required_error: "Role is required",
  }),
});

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);   //result.data 

    if (!result.success) {

      console.error(result.error.format());
      return;
    }
    
    //passed validation
    console.log("Register Data:", result.data);

   
 try {
      const res = await axios.post("http://localhost:3000/api/auth/register", result.data);
      console.log("Registration Successfull // Backend", res.data);
    }  

 catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
    }

  };

  return (
    <div className="main-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div>
          <label>Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
