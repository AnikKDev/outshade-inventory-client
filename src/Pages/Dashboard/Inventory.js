import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import useCategory from '../../hooks/useCategory';
import useProducts from '../../hooks/useProducts';
import {
    useQuery
} from '@tanstack/react-query';
import LoadingSpinner from '../SharedPages/LoadingSpinner';
const Inventory = () => {

    // get all the categories
    const [categories] = useCategory();
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setLoaded(true)
        fetch(`http://localhost:5000/products/${category}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoaded(false)
            })
    }, [category])
    const handleSelectedCategory = (e) => {
        setCategory(e.target.value);
    }

    return (
        <div className="my-3 mx-16">

            <h1 className="text-4xl text-center">Manage Inventory</h1>


            <div className="flex justify-between">
                <Link to='/add-product'><button class="btn">Add Product</button></Link>

                {/* <button className="btn btn-sm" >All Products</button> */}
                <select onChange={handleSelectedCategory} class="select select-bordered w-full max-w-xs">
                    <option>all products</option>
                    {
                        categories?.map(category =>
                            <option>{category.category}</option>
                        )
                    }

                    <option>+ Add Category</option>
                </select>
            </div>

            <div class="overflow-x-auto my-10">
                {
                    loaded && <LoadingSpinner />
                }
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