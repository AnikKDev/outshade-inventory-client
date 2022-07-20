import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useSignInWithGoogle, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../SharedPages/LoadingSpinner';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    // sign in with email
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const email = watch('email');
    // form submission
    const onSubmit = ({ email, password }) => {
        signInWithEmailAndPassword(email, password);
        reset();
    };
    // password reset mail
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(
        auth
    );
    const handlePassReset = async () => {

        if (email && !resetError) {
            console.log('success')
            await sendPasswordResetEmail(email);
            toast.success('Mail has been sent successfully');
        }
        else {
            toast.error('Something went wrong. Check mail input.')
        }
    };


    // sign in with google
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    useEffect(() => {
        if (user || gUser) {
            navigate(from, { replace: true });
        };
    }, [user, gUser, from, navigate]);

    if (error || gError) {
        toast.error('Ooops! try again')
    };

    if (loading || gLoading) {
        return <LoadingSpinner />
    };
    return (
        <div className=" flex justify-center lg:min-h-screen items-center">
            <div className="card w-full md:w-96 items-center shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full lg:w-96">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email" placeholder="email" className="input input-bordered"
                            {...register("email", { required: true })}

                        />
                        <span className="label-text text-error">{errors.email?.type === 'required' && "Email is required"}</span>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input

                            type="password" placeholder="password" className="input input-bordered"
                            {...register("password", { required: true })} />
                        <span className="label-text text-error">{errors.password?.type === 'required' && "Password is required"}</span>


                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>

                </form>
                <label className="my-2">
                    <button onClick={handlePassReset} className="btn btn-link px-0">Forgot password?</button>
                </label>
                <div className="divider">OR</div>
                <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-primary w-80">SIGN iN WITH GOOGLE</button>
                <label className="mt-2">
                    Don't have an account?<Link to="/signup" className="btn btn-link px-0">Sign Up</Link>
                </label>
            </div>
        </div>
    );
};

export default Login;