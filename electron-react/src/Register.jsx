import React from "react";
import './Register.css'
const Register = () => {
    return (
        <div className="registrasi">
            <div className="form-section">
                <h1>Register</h1>
                <div className="form-input">
                    <input type="text" placeholder="Username" className="username" />
                    <input type="text" placeholder="Gmail" className="gmail" />
                    <input
                        type="password"
                        className="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        className="confirm-password"
                        placeholder="Confirm Password"
                    />
                </div>
                <div className="form-button">
                    <p className="register-link ">Belom memiliki akun? </p>
                    <button className="btn-register">Register</button>
                </div>
            </div>
            <img src="/sidebar.png" alt="" srcSet="" className="image" />
        </div>
    );
};

export default Register;
