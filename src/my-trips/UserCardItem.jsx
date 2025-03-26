import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '../services/GlobalApis';

export default function UserCardItem({trip}) {
  const Photo_Ref_Url = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_KEY;
        const [photo, setPhoto] = useState();
          useEffect(()=>{
            trip&&GetPlacePhoto()
          },[trip])
          const GetPlacePhoto = async (activity) => {
            try {
                const data = {
                    textQuery: trip?.userSelections?.location?.label
                };
                const result = await GetPlaceDetails(data).then(resp=>{
                      resp.data.places[0].photos[3].name;
                   const photo_url = Photo_Ref_Url.replace('{NAME}', resp.data.places[0].photos[3].name);
                   console.log(photo_url)
                   setPhoto(photo_url);
            })
                
            } catch (error) {
                console.error("Error fetching place details:", error);
            }
        };
  return (

    <Link to={'/view-trip/'+trip.id}>
    <div className='rounded hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
        <img src={photo?photo: "/placeholder_img.jpg"} alt="" className='object-cover rounded-xl h-[220px]'/>
        <div>
            <h2 className='font-bold text-lg no-underline text-black'>{trip?.userSelections?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelections?.location?.noOfdays} days with {trip?.userSelections?.location?.budget}</h2>
        </div>
    </div>
    </Link>
  )
}
