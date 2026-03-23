import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './loginvalidation';
import axios from 'axios';

function Login() {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (validationErrors.email === "" && validationErrors.password === "") {

      axios.post('http://localhost:8081/login', values)
        .then(res => {

          // ✅ NEW JWT RESPONSE
          if (res.data.status === "Success") {

            // 🔐 Store token
            localStorage.setItem("token", res.data.token);

            navigate('/home');

          } else {
            alert("Invalid email or password");
          }

        })
        .catch(err => {
          console.error(err);
          alert("Server error");
        });
    }
  };

  // 🎨 Styles
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #007bff, #00c6ff)"
    },
    card: {
      width: "350px",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
    },
    input: {
      borderRadius: "8px",
      padding: "10px"
    },
    button: {
      borderRadius: "8px",
      fontWeight: "bold"
    },
    link: {
      textDecoration: "none",
      fontWeight: "500"
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.card}>

        <h2 className="text-center mb-4">🔐 Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              onChange={handleInput}
              style={styles.input}
            />
            {errors.email && <span className='text-danger small'>{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              onChange={handleInput}
              style={styles.input}
            />
            {errors.password && <span className='text-danger small'>{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-success w-100"
            style={styles.button}
          >
            Login
          </button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/signup" style={styles.link}>Register</Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;