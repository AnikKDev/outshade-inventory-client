import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useCategory from '../../hooks/useCategory';
import LoadingSpinner from '../SharedPages/LoadingSpinner';

const UpdateProduct = () => {
    const { id } = useParams();
    const [productDetail, setProductdetail] = useState({});
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProductdetail(data))
    }, [id]);
    console.log(productDetail);

    // get all the categories
    const [categories, isLoading, refetch] = useCategory();


    const onSubmit = data => {
        const product = {
            productName: data.name,
            price: data.price,
            quantity: data.quantity,
            category: data.category
        };
        console.log(product)
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
                                type="text" placeholder="Product Name" className="input input-bordered" defaultValue={productDetail?.productName} />
                            <span className="label-text text-error">{errors.name?.type === 'required' && "Please Update"}</span>
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
                                    categories?.map(category =>
                                        <option selected={productDetail.category === category.category}>
                                            {category?.category}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <span className="label-text text-error">{errors.category?.type === 'required' && "Please Update"}</span>



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price (per pc's / USD)</span>
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="number" placeholder="Price Per Piece" className="input input-bordered" defaultValue={productDetail?.price} />
                            <span className="label-text text-error">{errors.price?.type === 'required' && "Please Update"}</span>
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                {...register("quantity", { required: true })}
                                type="number" defaultValue={productDetail.quantity} min={1} placeholder="Available Quantity" className="input input-bordered" />
                            <span className="label-text text-error">{errors.quantity?.type === 'required' && "Please Update"}</span>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Update Detail</button>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateProduct;