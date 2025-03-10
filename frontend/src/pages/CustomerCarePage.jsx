import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CustomerCare from "../components/CustomerCare";

function CustomerCarePage({isAuthenticated}) {
  // State to track authentication status
 

  

  return (
    <div className='customercarepage'>
      <NavBar/>
      <CustomerCare/>
      <Footer/>
    </div>
  );
}

export default CustomerCarePage;