import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const Login = () => {

    const { loggedInUser, signInWithGoogle, passwordReset } = useContext(AuthContext);

    const handleLogin = () => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        loggedInUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset()
            })
            .catch(error => {
                console.log(error.message);
            })

    }
    // const handlePasswordResetBtn = () =>{
    //     const email = form.email.value;
    //     passwordReset(email)
    //     .then(()=>{

    //     })
    //     .catch(error =>{
    //         console.log(error.message);
    //     })
    // }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-96 flex-col">
                    <div className="text-center mb-5">
                        <h1 className="text-4xl font-bold">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' required type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' required type="password" placeholder="password" className="input input-bordered" />
                                <div className='flex justify-between'>
                                    <label className="label">
                                        <p className='label-text-alt'>
                                            Forgot Password? 
                                            <button onClick={handlePasswordResetBtn} className=" pl-1 link link-hover">  Reset</button>
                                        </p>
                                    </label>
                                    <label className="label">
                                        <p className='label-text-alt'>
                                            Not a user?
                                            <Link to='/register' className=" link link-hover"> Register</Link>
                                        </p>
                                    </label>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className='text-center pt-3'>
                                <p>Sign In With</p>
                                <button onClick={handleGoogleSignIn}><img className='w-8 pt-3' src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;