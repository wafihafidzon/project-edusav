import "./Login.css";
const Login = () => {
    return (
        <>
            <div className="login">
                <img src="/sidebar.png" alt="" srcset="" className="image" />
                <div className="form-section">
                    <h1>Login</h1>
                    <div className="form-input">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Gmail"
                            className="gmail"
                        />
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-button">
                        <p className="register-link ">Belom memiliki akun? </p>
                        <button className="btn-login">Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
