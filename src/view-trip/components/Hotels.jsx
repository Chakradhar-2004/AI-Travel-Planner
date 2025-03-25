import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItems from './HotelCardItems';

export default function Hotels({trip}) {
    return (
        <div>
          <h2 className='font-bold text-2xl mt-5'>Hotels Recommendations</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {trip?.TripData?.hotelOptions?.map((hotel, index) => (
              <HotelCardItems hotel={hotel} />
            ))}
          </div>
        </div>
      );
      
}
