import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useAuthStore from '../store/useAuthStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const userdata = useAuthStore((state) => state.setUser);
  const tokendata = useAuthStore((state) => state.setToken);
  const roledata = useAuthStore((state) => state.setRole);
  const company = useAuthStore((state) => state.setCompany);

  const validateForm = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const loginUser = () => {
    if (!validateForm()) return;

    axios 
      .post(process.env.REACT_APP_BASE_URL + 'User/Login', { email, password })
      .then((res) => {
        debugger;
        if (res.data.success === "200") {
          tokendata(res.data.token);
          userdata(res.data.user);
          roledata(res.data.role);
          company(res.data.company);
          navigate('/dashboard');
        } else if (res.data.success === "400") {
          swal("Invalid Credentials");
        } else if (res.data.success === "401") {
          swal("You need access. Please contact our customer support!");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data || err.message);
      });
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {/* Email Field */}
              <div className="form-outline mb-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                 
                  id="form3Example3"
                  className={`form-control form-control-lg ${emailError ? 'is-invalid' : ''}`}
                  placeholder="Enter a valid email address"
                />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
                {emailError && <div className="text-danger mt-1">{emailError}</div>}
              </div>

              {/* Password Field */}
              <div className="form-outline mb-3" style={{ position: 'relative' }}>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  id="form3Example4"
                  className={`form-control form-control-lg ${passwordError ? 'is-invalid' : ''}`}
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4">Password</label>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '15px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  onClick={loginUser}
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">Copyright © 2020.</div>
        <div>
          <a href="#!" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
          <a href="#!" className="text-white me-4"><i className="fab fa-twitter"></i></a>
          <a href="#!" className="text-white me-4"><i className="fab fa-google"></i></a>
          <a href="#!" className="text-white"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </section>
  );
}

export default Login;
