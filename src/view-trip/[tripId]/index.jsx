import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../constants/firebase';
import { doc, getDoc } from 'firebase/firestore'
import SelectedInfo from '../components/SelectedInfo';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

export default function Viewtrip() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(()=>{
        tripId&&getTripData();
    },[tripId]);

    const getTripData = async() => {
        const docRef = doc(db, "AI-Trip", tripId);
        const docSnap = await getDoc(docRef)
        if(docSnap.exists){
            console.log("Doc: ", docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            toast("NO TRIP FOUND!!!")
        }
    }
    
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* User Selected Information */}
        <SelectedInfo trip={trip}/>
        {/* Hotels List */}
        <Hotels trip={trip}/>
        {/* Itineray */}
        <PlacesToVisit trip={trip}/>
        {/* Footer */}
        <Footer />
    </div>
  )
}
