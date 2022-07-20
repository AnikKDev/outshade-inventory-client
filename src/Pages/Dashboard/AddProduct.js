import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import useCategory from '../../hooks/useCategory';
import LoadingSpinner from '../SharedPages/LoadingSpinner';
const AddProduct = () => {

    // get all the categories
    const [categories, isLoading, refetch] = useCategory();
    // console.log(categories)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    // add tools
    const onSubmit = data => {
        const product = {
            productName: data.name,
            price: data.price,
            quantity: data.quantity,
            category: data.category
        };
        // console.log(product)

        // add data to database
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Successfully added')
                }
            })
        reset()

    };

    if (isLoading) {
        return <LoadingSpinner />
    }
    return (

        < div >
            <div className=" flex justify-center">
                <div className="mb-8 card w-full md:mt-11 md:w-96 items-center shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full lg:w-96">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                {...register("name", { required: true })}
                                type="text" placeholder="Product Name" className="input input-bordered" />
                            <span className="label-text text-error">{errors.name?.type === 'required' && "Name is required"}</span>
                        </div>
                        {/* select */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Category</span>
                            </label>
                            <select
                                {...register("category", { required: true })}

                                className="select select-bordered"
                            >
                                {
                                    categories.map(category =>
                                        <option>
                                            {category?.category}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <span className="label-text text-error">{errors.category?.type === 'required' && "Category is required"}</span>



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price (per pc's / USD)</span>
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="number" placeholder="Price Piece" className="input input-bordered" />
                            <span className="label-text text-error">{errors.price?.type === 'required' && "Price is required"}</span>
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                {...register("quantity", { required: true })}
                                type="number" defaultValue={1} min={1} placeholder="Available Quantity" className="input input-bordered" />
                            <span className="label-text text-error">{errors.quantity?.type === 'required' && "Quantity is required"}</span>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Add Tool</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    );
};

export default AddProduct;