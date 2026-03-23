import React from 'react';
import { Link } from 'react-router-dom';

function Registration() {
  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter name" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>
        <button type="submit" className="btn btn-success">Register</button>
        <p className="mt-3">Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}

export default Registration;
