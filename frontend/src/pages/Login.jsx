import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loginPage, setLoginPage] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [loginButtonLoading, setLoginButtonLoading] = useState(false);
    const [otpButtonLoading, setOtpButtonLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginButtonLoading(true);
        // Add your authentication logic here
        // console.log('haa login hi hai');
        console.log('Logging in with:', { email, password });
        try {
            const res = await axios.post('http://localhost:5555/login', { email: email, password: password }, { withCredentials: true });
            console.log(res);
            localStorage.setItem('login', JSON.stringify(
                {
                    id: res.data.id,
                    token: res.data.token,
                    email: email
                }
            ));
            // console.log('done logging in');
            navigate('/');
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Error', { variant: 'error' });
        }
        setLoginButtonLoading(false);
        // console.log(loginPage)
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoginButtonLoading(true);
        try {
            const res = await axios.post('http://localhost:5555/signup',
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,  // This option allows credentials (cookies, auth headers, etc.) to be sent
                }
            );
            document.getElementById('my_modal_3').showModal()
            console.log(res);
        } catch (error) {
            if (error.response.data.message)
                // console.log(error.response.data.message');
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
            else {
                console.log(error);
            }
        }
        console.log('Registering with:', { email, password });
        console.log(loginPage)
        setLoginButtonLoading(false);
    };
    const handleValidateOTP = async (e) => {
        setOtpButtonLoading(true);
        try {
            const res = await axios.post('http://localhost:5555/validate-otp', {
                email: email,
                otp, password
            }, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            if (error.response.data.message) {
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
                console.log(error.response.data.message == 'User already exists');
                if (error.response.data.message == 'User already exists') {
                    navigate('/login');
                }
            }
            else {
                console.log(error);
            }
        }
        setOtpButtonLoading(false);
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6">{loginPage ? 'LogIn' : 'Register'}</h2>
                    <form onSubmit={loginPage ? handleLogin : handleRegister}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loginButtonLoading ? <span className="loading loading-spinner text-warning"></span> : loginPage ? 'Login' : 'Register'}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <a className="text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => { setLoginPage(!loginPage) }}>
                                {loginPage ? 'Sign up' : 'LogIn'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Please Enter Your OTP</h3>
                    <p className="py-4"></p>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter OTP" onChange={(e) => { setOtp(e.target.value) }} value={otp} />
                    <button className="w-full py-2 mt-5 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleValidateOTP}>
                        {
                            otpButtonLoading ? <span className="loading loading-spinner text-warning"></span> : 'Verify OTP'
                        }
                    </button>
                </div>
            </dialog>
        </>
    );
};

export default LoginPage;
