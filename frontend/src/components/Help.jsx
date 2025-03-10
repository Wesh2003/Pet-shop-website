import React from 'react';

function Help(){


    return (
        <div>
            <div className='help-page'>
                <div className="Helpp">
                    <h1>Common Customer Issues</h1>
                    <br></br>
                    <br></br>
                    <h4 className='helpHeading'>
                    What payment methods are accepted on ShopMate
                    </h4>
                    <br></br>
                    <p>
                    We accept variety of payment methods including:
                    <br></br>
                        Pay on Delivery allows for payment via ShopMatePay on delivery by card or mobile money
                        <br></br>
                        (Mpesa,Airtel Money) upon delivery instead of cash.
                        <br></br>
                        ShopMatePay accepts payment through Mpesa, Airtel Money, Mastercard, or Visa cards.
                    </p>
                    <br></br>
                    <h4 className='helpHeading'>
                    How secure is my payment information on ShopMate?
                    </h4>
                    <br></br>
                    <p>
                    We accept variety of payment methods including:
                    <br></br>
                    ShopMate prioritizes customer payment security with encryption, and secure servers.
                    <br></br>
                    Regular monitoring and auditing are also performed to maintain a secure environment for transactions.
                    </p>
                </div>
                <img className = 'img' src='https://media.istockphoto.com/id/1423369897/photo/call-center-worker.jpg?s=612x612&w=0&k=20&c=KaxWNnsroknjxkXjfJijLhmdomOGFt4T-RwUF0qK3hc=' alt='Customer care'/>
            </div>
        </div>
    )
}

export default Help