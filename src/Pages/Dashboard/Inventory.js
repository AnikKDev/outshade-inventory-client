import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import useCategory from '../../hooks/useCategory';
import LoadingSpinner from '../SharedPages/LoadingSpinner';
const Inventory = () => {

    // get all the categories
    const [categories, , refetch] = useCategory();
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const catRef = useRef('');
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
    };
    const navigate = useNavigate();
    // update product
    const updateHandler = id => {
        navigate(`/products/${id}`)
    }

    // add category
    const addCategory = () => {
        const newCategory = { category: catRef.current.value };

        if (newCategory > 0) {
            fetch('http://localhost:5000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Added category')
                    }
                })

        } else {
            toast.error('Something went wrong')
        }
        refetch()
    };

    return (
        <div className="my-3 mx-16">

            <h1 className="text-4xl text-center">Manage Inventory</h1>


            <div className="flex justify-between mt-12 mx-8">
                <Link to='/add-product'><button class="btn btn-sm">+ Add Product</button></Link>

                {/* <button className="btn btn-sm" >All Products</button> */}
                <select onChange={handleSelectedCategory} class="select select-bordered w-full max-w-xs">
                    <option>all products</option>
                    {
                        categories?.map(category =>
                            <option>{category.category}</option>
                        )
                    }


                </select>
                {/* add category */}
                <div class="form-control">
                    <div class="input-group">
                        <input required ref={catRef} type="text" placeholder="Add Category" class="input input-bordered" />
                        <button onClick={addCategory} class="btn btn-square">
                            <i class="fa-solid fa-plus text-2xl"></i>
                        </button>
                    </div>
                </div>
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
                                    <td>

                                        <button onClick={() => updateHandler(product._id)} className="btn btn-sm btn-success mx-1">Update</button>
                                        |
                                        <button className="btn btn-sm btn-error mx-1">Delete</button>

                                    </td>
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