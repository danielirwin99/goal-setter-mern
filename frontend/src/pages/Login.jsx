import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Login = () => {
  // Initial states of the Forms
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructuring the values to use in each input
  const { email, password } = formData;

  const onChange = (e) => {
    // Allows us to the change the Data / Use it
    // Setting the formData to an object
    setFormData((prevState) => ({
      ...prevState,
      // We want to get the key from whatever the name value is
      // We get the key from whatever we type in --> e.target.value
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Login and Start Setting Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
