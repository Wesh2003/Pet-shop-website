import React from 'react'
import { useState, useEffect} from "react"
import {Form,Row,Col,Container, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function CheckoutForm() {

  const navigate = useNavigate();
  const[loading, setLoading]= useState(false);
//   const[error, setError]= useState(null);
  const [usernameID, setUsernameID] = useState("");
  const [users, setUsers]= useState([])
  const [delivery_address, setDelivery_address]=useState('')
  const [city, setCity]=useState('')
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState('')

//   const userId = localStorage.getItem("id");
    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then((data) => {
                console.log(data)
                setUsers(data)
                });
        }, []);

    // useEffect(() => {
    //     function calculateTotalCost(){
    //         let totalcost = 0;
    //         for (let item of cartItems){
    //             totalcost += item.price;
    //             console.log(item.price)
    //         }
    //         console.log(totalcost)
    //         setTotal(totalcost.toFixed(2));
    //     }
    //     fetch(`https://backend-phase5-project.onrender.com/shoppingcart/${userId}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setCartItems(data.cart); // Assuming 'cart' is the key containing your array of items
    //             calculateTotalCost();
    //         })
    //         .catch(error => {
    //             console.error('Error fetching shopping cart items:', error);
    //         });
            
    //     }, [userId, calculateTotalCost]); // Make sure to include userId as a dependency of useEffect

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            user_id: parseInt(usernameID),
            delivery_address,
            city,
        };
        console.log(formData)
        try {
            const response = await fetch('/receipt', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setLoading(false);
        } catch (error) {
            // Handle error
            setLoading(false);
        } finally {
          navigate('/home');
        }
    };

  if  (loading){
    return <h4>Loading...</h4>
  }




  return (
    <div>
        <Container className='mb-5'>
            <h3 className="text-center mt-3 mb-4">Checkout Form</h3>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Control name='delivery_address' value={delivery_address} onChange={(e) => setDelivery_address(e.target.value)} type='text' placeholder="delivery_address" /><br/>
                        <Form.Control name='city' value={city} onChange={(e) => setCity(e.target.value)} type='text' placeholder="city" /><br/>

                    </Col>
                    <Col>
                        <Form.Select name='user_id' value={usernameID} onChange={(e) => setUsernameID(e.target.value)} aria-label="Default select example">
                        <option value="">Select your username</option>
                            {Array.isArray(users) && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                            ))}
                        </Form.Select><br/>   
                        <Form.Select name='user_id' aria-label="Default select example">
                        <option value="">Select your phone number</option>
                            {Array.isArray(users) && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.phone}
                            </option>
                            ))}
                        </Form.Select><br/>   
                        <Form.Select name='user_id' aria-label="Default select example">
                        <option value="">Select your email</option>
                            {Array.isArray(users) && users.map((user) => (
                              <option key={user.id} value={user.id}>
                                  {user.email}
                              </option>
                            ))}
                        </Form.Select><br/>   
                    </Col>
                    {/* <h2>Total Cost:{total}</h2> */}
                </Row>
                <Button variant="primary" type="submit">
                    Place Order
                </Button>
            </Form>
        </Container>
    </div>
  )







  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   phone: '',
  //   deliveryAddress:'',
  //   shippingDetails :'',

  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //    [name]: value,
  //   });

  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Validate form data here if needed
  //   onSubmit(formData);

  // };
  
  // // const handleAddToReceipt = () => {
  // //   fetch('/add-to-receipt', {  // Change the endpoint to /add-to-receipt
  // //     method: 'POST',
  // //     headers: {
  // //       'Content-Type': 'application/json',
  // //     },
  // //     body: JSON.stringify(formData),
  // //   })
  // //   .then(response => {
  // //     if (response.ok) {
  // //       // Assuming the response contains the updated receipt items
  // //       return response.json();
  // //     } else {
  // //       console.error('Failed to add item to receipt');
  // //     }
  // //   })
  // //   .then(data => {
  // //     // Update the UI with the updated receipt items
  // //     // This could involve rendering the receipt table with the new data
  // //   // newreceiptTable(data);
  // //   })
  // //   .catch(error => {
  // //     console.error('Error adding item to receipt:', error);
  // //   });
  // // };
  
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <h2>Checkout</h2>
  //     <div>
  //       <label htmlFor="fullName">Full Name</label>
  //       <input
  //         type="text"
  //         id="fullName"
  //         name="fullName"
  //         value={formData.fullName}
  //         onChange={handleChange}
  //         required
  //       />

  //     </div>

  //     <div>

  //       <label htmlFor="email">Email</label>
  //       <input
  //         type="email"
  //         id="email"
  //         name="email"
  //         value={formData.email}
  //         onChange={handleChange}
  //         required
  //       />

  //     </div>
  //     <div>
  //       <label htmlFor="deliveryAddress">deliveryAddress</label>
  //       <input
  //         type="text"
  //         id="deliveryAddress"
  //         name="deliveraddress"
  //         value={formData.address}
  //         onChange={handleChange}
  //         required
  //       />

  //     </div>
  //     <div>
  //       <label htmlFor="phone">phone</label>
  //       <input
  //         type="text"
  //         id="phone"
  //         name="phone"
  //         value={formData.city}
  //         onChange={handleChange}
  //         required
  //       />
  //     <div> 
  //     <label htmlFor="shippingAddress">shippingAddress</label>
  //       <input
  //         type="text"
  //         id="shippingAddress"
  //         name="shippingAddress"
  //         value={formData.city}
  //         onChange={handleChange}
  //         required
  //       />


  //       </div>  
  //     </div>  
  //     <button type="submit">Submit</button>
  //   </form>

  // );

}

 

export default CheckoutForm;