import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '../../services/GlobalApis';

export default function PlacesCardItem({ details }) {
  const Photo_Ref_Url = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_KEY;
      const [photo, setPhoto] = useState();
        useEffect(()=>{
          if(details?.activities){
            details.activities.forEach((activity)=>{
              GetPlacePhoto(activity);
            });
          }
        },[details])
        const GetPlacePhoto = async (activity) => {
          try {
              const data = {
                  textQuery: activity?.placeName
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
    
    <div className='border rounded-xl p-3 mt-2'>
      {details?.activities?.map((activity, index) => (
        <Link to={'https://www.google.com/maps/search/?api=1&query='+activity?.placeName} target='_blank'>
        <div key={index} className='flex items-center gap-4 border-b pb-2 mb-2 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
          <img
            src={photo?photo: "/placeholder_img.jpg"}
            alt={activity?.placeName || "Activity Image"}
            className='w-[130px] h-[130px] rounded-xl object-cover'
          />
          <div>
            <h2 className='font-bold text-lg no-underline text-black'>{activity?.placeName || "No Place Name"}</h2>
            <p className='text-sm text-gray-600'>{activity?.placeDetails || "No details available"}</p>
            <h2 className='font-semibold text-orange-500'>{activity?.travelTime || "No Travel Time Available"}</h2>
            <p className='text-green-600 font-medium'>{activity?.ticketPricing || "No Ticket Pricing Available"}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
    
  );
}
