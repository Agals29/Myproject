import React from 'react'
import Tem from "./Carosual";
import Sec from "./Sectiontwo";
import Three from "./Section3";
 import Orders from "./Orders";
 import Photos from"./Photos";
import Reviews from "./Reviews";
import Email from "./Email";
const FrontPage = () => {
  return (
    <div>
        
      <Tem />
     <Sec />
      <Three />
      <Orders />
      <Photos />
     <Reviews/>
     <Email/>
    </div>
  );
}

export default FrontPage;