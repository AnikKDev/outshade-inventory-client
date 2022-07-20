import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useQuery } from 'react-query';
import LoadingSpinner from '../../SharedPages/LoadingSpinner';
import swal from 'sweetalert';
const MyProfile = () => {
    const [user] = useAuthState(auth)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [userInfo, setUserInfo] = useState({})

    // get user with specific id
    const { data: updatedUser, isLoading, refetch } = useQuery('user', () => fetch(`https://whispering-sierra-85456.herokuapp.com/user/${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    useEffect(() => {
        if (updatedUser) {
            setUserInfo(updatedUser);
        }
    }, [updatedUser])


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    const onSubmit = ({ phone, name, location, education, linkedin }) => {



        const userData = {
            phone: phone,
            name: name,
            location: location,
            education: education,
            linkedin: linkedin
        };
        fetch(`https://whispering-sierra-85456.herokuapp.com/myprofile/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal("Success", "Updated successfully!", "success");
                    refetch();
                    reset();

                } else {
                    swal("Failed", "Failed to update data. Try again!", "error");
                }
            })
    };
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row">
                <div className=" lg:text-left lg:mr-10">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-3 text-primary">My Profile</h2>
                            <p className="my-2"><span className="font-bold uppercase ">Email:</span> {user?.email}</p>
                            <p className="my-2"><span className="font-bold uppercase ">Name:</span> {user?.displayName || userInfo?.name}</p>
                            <p className="my-2"><span className="font-bold uppercase ">Location:</span> {userInfo?.location}</p>
                            <p className="my-2"><span className="font-bold uppercase ">Education:</span> {userInfo?.education}</p>
                            <p className="my-2"><span className="font-bold uppercase ">LinkedIn URL:</span> {userInfo?.linkedin}</p>
                            <p className="my-2"><span className="font-bold uppercase ">Phone:</span> {userInfo?.phone}</p>
                        </div>
                    </div>


                </div>
                <div className="card mb-2 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="email" name="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled readonly value={user?.email || ''} />
                                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>


                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                    {...register("name", { required: true })}
                                />

                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                                {errors.name?.type === 'required' && <span className="text-error">Name is required</span>}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    {...register("location", { required: true })}
                                />
                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>
                                {errors.location?.type === 'required' && <span className="text-error">Location is required</span>}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    {...register("education", { required: true })}
                                />
                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Education</label>
                                {errors.education?.type === 'required' && <span className="text-error">Education field is required</span>}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    {...register("linkedin", { required: true })}
                                />
                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">LinkedIn</label>
                                {errors.linkedin?.type === 'required' && <span className="text-error">LikedIn profile  required</span>}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="tel" pattern="[0-9]{11}" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    {...register("phone", { required: true })}
                                />
                                <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (1234567890)</label>
                                {errors.phone?.type === 'required' && <span className="text-error">Phone number is required</span>}
                            </div>
                            <button type="submit" className="text-white btn btn-sm btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;