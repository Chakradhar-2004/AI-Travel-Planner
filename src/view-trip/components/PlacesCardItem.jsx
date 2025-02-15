import React from 'react';
import { Link } from 'react-router-dom';

export default function PlacesCardItem({ details }) {
  console.log(details);

  return (
    
    <div className='border rounded-xl p-3 mt-2'>
      {details?.activities?.map((activity, index) => (
        <Link to={'https://www.google.com/maps/search/?api=1&query='+activity?.placeName} target='_blank'>
        <div key={index} className='flex items-center gap-4 border-b pb-2 mb-2 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
          <img
            src={"/placeholder_img.jpg"}
            alt={activity?.placeName || "Activity Image"}
            className='w-[130px] h-[130px] rounded-xl'
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
