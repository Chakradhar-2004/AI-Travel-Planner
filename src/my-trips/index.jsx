import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../constants/firebase'
import UserCardItem from './UserCardItem.jsx'

export default function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    getUserTrip();
  }, []);
  const getUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    
    const q = query(collection(db, "AI-Trip"), where("userEmail", "==", user?.email));
    
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
        
      console.log(doc.id, " => ", doc.data()); 
      setUserTrips(prevVal=>[...prevVal,doc.data()]);
    });
    
  };

  return <div className="p-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
    <h2 className="font-bold text-3xl">MyTrips</h2>
    <div className="grid grid-col-2 mt-10 md:grid-cols-3 gap-5 ">
        {userTrips?.length>0?userTrips.map((trip, index)=>(
            <UserCardItem trip={trip} key={index}/>
        ))
    :[1,2,3,4,5,6].map((item, index)=>(
        <div key={index} className="h-[250px] w-full bg-slate-300 animate-pulse rounded-xl"></div>
    ))
    }
    </div>
  </div>;
}
