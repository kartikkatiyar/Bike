import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './Components/Home';
import UserRegistration from './Components/UserRegistration';
import UserProfileSetup from './Components/UserProfileSetup';
import BikeListing from './Components/BikeListing';
import DocumentUpload from './Components/DocumentUpload';
import RentingPrice from './Components/rentingPrice';
import BikeDocument from './Components/BikeDocument';
import Compliance from './Components/Compliance';
import ThankYouPage from './Components/Thankyou';

function App() {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/register' element={<UserRegistration></UserRegistration>} />
      <Route path='/profileSetup' element={<UserProfileSetup></UserProfileSetup>} />
      <Route path='/bikeListing' element={<BikeListing></BikeListing>} />
      <Route path='/documentUpload' element={<DocumentUpload></DocumentUpload>} />
      <Route path='/renting' element={<RentingPrice></RentingPrice>} />
      <Route path='/BikeDocument' element={<BikeDocument />} />
      <Route path='/Compliance' element={<Compliance />} />
      <Route path='/thankyou' element={<ThankYouPage />} />
    </Routes>
    </>
  );
}

export default App;
