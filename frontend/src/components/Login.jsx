import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password
        }
        await axios.post('http://localhost:4004/user/login', userInfo)
            .then((res) => {
                console.log(res);
                if (res.data) {
                    toast.success("Login Successfull");
                    // alert("Login Successfull");
                }
                localStorage.setItem("User", JSON.stringify(res.data.user));
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    // alert(err.response.data.message);
                    toast.error(err.response.data.message);
                }
            })
    }

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* if there is a button in form, it will close the modal */}
                        <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</Link>
                        <h3 className="font-bold text-lg">Login!</h3>
                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input type="email" placeholder='Enter Your Email' className='py-1 w-80 px-3 border rounded-md outline-none'
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Not a valid email"
                                    }
                                })}
                            />
                            <br />
                            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                        </div>
                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input type="password" placeholder='Enter Your Password' className='py-1 w-80 px-3 border rounded-md outline-none'
                                {...register("password", { required: "This field is required" })}
                            />
                            <br />
                            {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                        </div>
                        <div className='flex justify-around mt-4'>
                            <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-800 duration-200'>Login</button>
                            <p>Not Registered? <Link
                                to="/signup"
                                className="underline text-pink-600 cursor-pointer hover:text-pink-900"
                            >
                                Signup
                            </Link></p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;
