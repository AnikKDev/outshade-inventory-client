import React from 'react';
import { useForm } from "react-hook-form";

const MyProfile = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


    const onSubmit = data => {
        console.log(data)
        // reset();
    };
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Profile</h1>
                    <div className="my-10">
                        <h5 className="text-xl my-5">Name:</h5>
                        <h5 className="text-xl my-5">Address:</h5>
                        <h5 className="text-xl my-5">Email:</h5>
                        <h5 className="text-xl my-5">Phone:</h5>
                    </div>
                </div>
                <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full lg:w-96">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text" placeholder="name" className="input input-bordered" />
                                <span className="label-text text-error">{errors.email?.type === 'required' && "Name is required"}</span>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email" placeholder="email" className="input input-bordered" />
                                <span className="label-text text-error">{errors.email?.type === 'required' && "Email is required"}</span>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    {...register("address", { required: true })}
                                    type="text" placeholder="Address" className="input input-bordered" />
                                <span className="label-text text-error">{errors.address && "Address is required"}</span>


                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input
                                    {...register("phone", { required: true })}
                                    type="tel" placeholder="Phone" className="input input-bordered" />
                                <span className="label-text text-error">{errors.phone && "Phone is required"}</span>


                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Update Bio</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;