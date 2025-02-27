import React from 'react'
import Tem from "./Carosual";
import Sec from "./Sectiontwo";
import Three from "./Section3";
 import Orders from "./Orders";
 import Photos from"./Photos";
import Reviews from "./Reviews";
import Email from "./Email";
import OrdersPage from './Orders';


const FrontPage = () => {
  
  return (
    <div>
        
      <Tem />
     <Sec />
      <Three />
      {/* <Orders /> */}
      <OrdersPage />
      <Photos />
     <Reviews/>
     <Email/>
     <card />
    
    </div>
  );
}

export default FrontPage;