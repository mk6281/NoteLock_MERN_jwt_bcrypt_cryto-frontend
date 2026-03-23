import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './signupvalidation';
import axios from 'axios';

function SignUp() {

  const [values, setValues] = useState({
    name: '',
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

    if (
      validationErrors.name === "" &&
      validationErrors.email === "" &&
      validationErrors.password === ""
    ) {
      axios.post('https://notelock-mern-jwt-bcrypt-cryto-backend.onrender.com/signup', values)
        .then(res => {
          console.log(res.data);
          navigate('/login');
        })
        .catch(err => console.log(err));
    }
  };

  // 🎨 Inline styles
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #28a745, #85d8ce)"
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

        <h2 className="text-center mb-4">📝 Register</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control"
              onChange={handleInput}
              style={styles.input}
            />
            {errors.name && <span className='text-danger small'>{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={handleInput}
              style={styles.input}
            />
            {errors.email && <span className='text-danger small'>{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password (min 6 chars)"
              className="form-control"
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
            Sign Up
          </button>

          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login" style={styles.link}>Login</Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SignUp;
