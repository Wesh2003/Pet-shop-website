import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
// import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCartTable from './ShoppingCartTable'; // Import the ShoppingCart component

function ProductsTable() {
    const [jobs, setJobs] = useState([]);
    const [jobAddedToCart, setJobAddedToCart] = useState(false);
    // const userId = localStorage.getItem("id");

    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    useEffect(() => {
        fetch("http://127.0.0.1:5000/jobs")
            .then(response => response.json())
            .then((data) => setJobs(data));
    }, []);

    const handleFilterByCategory = () => {
        if (selectedCategory === "All Categories") {
            return jobs;
        } else {
            return jobs.filter(job => job.title === selectedCategory);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const categories = ['All Categories', ...new Set(jobs.map(item => item.title))];

    async function handleAddToCart(item) {
        const userId = Number(localStorage.getItem("id"));
        const token = localStorage.getItem("access_token"); // Retrieve the JWT token

        console.log("User ID:", userId);
        console.log("Token:", token);
        if (!userId || !token) {
            console.error("User ID or Token is missing!");
            return;
        }
        console.log("Item ID:", item.id);
        const formData = {
            job_id: Number(item.id),
            // Add other properties as needed
        };
        console.log("Adding to cart:", formData);
        try {
            const response = await fetch(`http://127.0.0.1:5000/shoppingcart/${userId}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}` // Include the JWT token in the request header
                }
            });
    
            if (!response.ok) {
                throw new Error('Could not add to cart');
            }
            setJobAddedToCart(true);
            window.prompt('added item to user shopping cart')
        } catch (error) {
            console.error('Error:', error);
            // Handle error appropriately (e.g., display error message to user)
        }
    }
    
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12 text-center">
                    <h1>Tasks</h1>
                    <SearchBar jobs={jobs} />
                </div>
                <CategoryFilter categories={categories} category={selectedCategory} handleCategoryChange={handleCategoryChange} />
            </div>
            <div className="row">
                {handleFilterByCategory().map((item) => (
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={item._id} id='entire-card'>
                        <div className="card">
                            <div className="row no-gutters">
                                {/* <div className="col-md-4" id='image-div'>
                                    <img
                                        src={item.image_url}
                                        alt="Product"
                                        className="card-img"
                                        style={{ objectFit: 'auto' }}
                                    />
                                </div> */}
                                <div className="col-md-8">
                                    <div className="card-body">

                                        <h5 className="card-title" style={{ color: "black" }}>{item.title}</h5>
                                        <p className="card-text"><strong>Description:</strong> {item.description}</p>
                                        <p className="card-text"><strong>Price:</strong> {item.cost}</p>
                                        {/* <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p> */}
                                        {/* <p className="card-text"><strong>Category:</strong> {item.category}</p> */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            {/* Use handleAddToCart function to trigger the rendering of the ShoppingCart component */}
                                            
                                            <button className="btn btn-primary mr-2" onClick={() => handleAddToCart(item)}>Add To Cart</button>
                                            {/* <button className="btn btn-info"><Link to={`/reviews`} className="link" id='reviewbutton'>Review</Link></button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Render the ShoppingCart component if an item is added to the cart */}
            {jobAddedToCart && <ShoppingCartTable />}
        </div>
    );
}

export default ProductsTable;