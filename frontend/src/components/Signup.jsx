import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form";
function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className='flex h-screen items-center justify-center' >
        <div className="w-[600px] ">
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
              <h3 className="font-bold text-lg">Sign Up!</h3>
              <div className='mt-4 space-y-2'>
                <span>Name</span>
                <br />
                <input type="text" placeholder='Enter Your Name' className='py-1 w-80 px-3 border rounded-md outline-none'
                  {...register("name", { required: true })}
                />
                <br />
                {errors.name && <span className='text-sm text-red-500'>The field is required</span>}
              </div>
              <div className='mt-4 space-y-2'>
                <span>Email</span>
                <br />
                <input type="email" placeholder='Enter Your Email' className='py-1 w-80 px-3 border rounded-md outline-none'
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && <span className='text-sm text-red-500'>The field is required</span>}
              </div>
              <div className='mt-4 space-y-2'>
                <span>Password</span>
                <br />
                <input type="password" placeholder='Enter Your Password' className='py-1 w-80 px-3 border rounded-md outline-none'
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && <span className='text-sm text-red-500'>The field is required</span>}
              </div>
              <div className='flex justify-around mt-4'>
                <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-800 duration-200'>Sign Up</button>
                <p className='text-md' >Have an Account?
                  <button
                    className="underline text-pink-600 cursor-pointer hover:text-pink-900"
                    onClick={() => (document.getElementById('my_modal_3').showModal())}
                  >
                    Login
                  </button></p>
                <Login />
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

export default Signup