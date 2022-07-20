import React from 'react';
import { Link } from 'react-router-dom'
import useCategory from '../../hooks/useCategory';
import useProducts from '../../hooks/useProducts';
import LoadingSpinner from '../SharedPages/LoadingSpinner';
const Inventory = () => {
    // get all the products
    const [products, isLoading, refetch] = useProducts();

    // get all the categories
    const [categories] = useCategory();
    refetch();
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className="my-3 mx-16">
            <h1 className="text-4xl text-center">Manage Inventory</h1>

            <div className="flex justify-between">
                <Link to='/add-product'><button class="btn">Add Product</button></Link>


                <select class="select select-bordered w-full max-w-xs">
                    <option selected>All Products</option>
                    {
                        categories?.map(category =>
                            <option>{category.category}</option>
                        )
                    }

                    <option>+ Add Category</option>
                </select>
            </div>

            <div class="overflow-x-auto my-10">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price (pc's)</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map(product =>
                                <tr>
                                    <th>{product?._id}</th>
                                    <td>{product?.productName}</td>
                                    <td>{product?.price}</td>
                                    <td>{product?.category}</td>
                                    <td>{product?.quantity}</td>
                                    <td>Delete | Update</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Inventory;