import {useState} from 'react';
import './index.scss';
import {Link, useNavigate} from 'react-router-dom';

import loginUser from '../../ApiFunctions/loginUser';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import {poptastic} from '../../helpers/poptastic';

const buttons = [
    {
        name: 'HOME',
        path: '/',
        isButton: false,
    },
    {
        name: 'REGISTER',
        path: '/register',
        isButton: true,
    },
];

const Login = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };
    const togglePassword = (e: any) => {
        e.preventDefault();
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };

    const loginWithGoogle = async () => {
        console.log('login with google');
        poptastic(`${process.env.REACT_APP_SERVER_URL}/auth/google`, navigate);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await loginUser({email, password});
            if (res.access_token) {
                localStorage.setItem('jwt', res.access_token);
                navigate('/areas');
            } else {
                setEmail('');
                setPassword('');
                // TODO: show error message
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header buttons={buttons} />
            <div className="page">
                <img className="loginBack" src="LoginBack.svg" alt="loginBack" />
                <img className="loginBackFiles" src="LoginBackFiles.svg" alt="loginBackRight" />
                <div className="formContainer">
                    <form className="form">
                        <div className="formHeader">
                            <h1>LOG IN</h1>
                        </div>
                        <div className="formBody">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type={passwordType}
                                name="password"
                                id="passwordInput"
                                placeholder="Enter Password"
                                unselectable="on"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button className="buttonPassword" onClick={togglePassword}>
                                {passwordType === 'password' ? (
                                    <img src="bxs_show.png" className="buttonShowPassword" alt="show" />
                                ) : (
                                    <img src="bxs_hide.png" className="buttonHidePassword" alt="hide" />
                                )}
                            </button>
                        </div>
                        <div className="formFooter">
                            <button onClick={handleLogin} disabled={isLoading}>
                                {isLoading && <Loader />}Sign In
                            </button>
                        </div>
                        <hr className="lineText" data-content="Or sign with" />
                        <div className="alternateLogins">
                            <button type="button" onClick={() => loginWithGoogle()}>
                                <img src="logo_google.svg" alt="Google" />
                            </button>
                        </div>
                        <Link className="registerText" to="/register">
                            <p>
                                Don't have an account? <b>Register now!</b>
                            </p>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
