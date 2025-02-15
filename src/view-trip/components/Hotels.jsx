import React from 'react'
import { Link } from 'react-router-dom'

export default function Hotels({trip}) {
    return (
        <div>
          <h2 className='font-bold text-2xl mt-5'>Hotels Recommendations</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {trip?.TripData?.hotelOptions?.map((hotel, index) => (
              <Link
                key={index}
                to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.address}
                target='_blank'
                className="no-underline text-black"
              >
                <div className='hover:scale-105 no-underline text-black transition-all cursor-pointer'>
                  <img className='rounded' src="/placeholder_img.jpg" alt="" />
                  <div className='my-2 flex flex-col'>
                    <h2 className='text-xm font-bold'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                    <div className='flex justify-between pl-1 pr-3'>
                      <h2 className='text-sm font-semibold'>
                        {hotel?.pricePerNight}₹/<span className='text-xs text-gray-500'>Night</span>
                      </h2>
                      <h2 className='text-xm'>⭐️ {hotel?.ratings}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
      
}
