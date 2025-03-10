import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Help from "../components/Help";

function HelpPage({isAuthenticated}) {
  // State to track authentication status
 

  

  return (
    <div className='helppage'>
      <NavBar/>
      <Help/>
      <Footer/>
    </div>
  );
}

export default HelpPage;