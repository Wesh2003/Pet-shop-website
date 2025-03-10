import React from 'react';
import { Link } from "react-router-dom";

function CustomerCare(){


    return (
        <div>
            <div className='customer-care'>
                <div className="CustCare">
                    <h1>Customer Service</h1>
                    <p> <b>We at ShopMate are always happy to serve our customers with the 
                        <br></br>
                        best of products ranging from designer ware to electronics
                        <br></br>
                        and everything in between. If you have any questions or need help, 
                        <br></br>
                        feel free to contact us!
                        </b>
                    </p>
                    <br></br>
                    <b>
                        <p>
                            Address: 786 Lucien Cape, Vasilikichester, SC 38476
                        </p>
                        <p>
                            Email: shopmate@gmail.com
                        </p>
                        <p>
                            Phone: 0712345678
                        </p>
                    </b>
                    <br></br>
                    <p>
                        For common problems  like ordering issues, please refer to our Help Page below:
                    </p>
                    <br></br>
                    <button className="help-button"><Link to={`/help`} className="link" id = 'helpbutton'>Help Page</Link></button>


                </div>
                <img className = 'img' src='https://media.istockphoto.com/id/1331493599/photo/shot-of-a-businessman-using-a-computer-while-working-in-a-call-center.jpg?s=612x612&w=0&k=20&c=ocaFzVRnDARFnANjyd6CMrwAI0Ua6I0Na_MKej8IysA=' alt='Customer care'/>
            </div>
        </div>
    )
}

export default CustomerCare