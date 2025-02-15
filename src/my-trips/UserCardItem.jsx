import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCardItem({trip}) {
  return (

    <Link to={'/view-trip/'+trip.id}>
    <div className='rounded hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
        <img src="/placeholder_img.jpg" alt="" className='object-cover rounded-xl h-[220px]'/>
        <div>
            <h2 className='font-bold text-lg no-underline text-black'>{trip?.userSelections?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelections?.location?.noOfdays} days with {trip?.userSelections?.location?.budget}</h2>
        </div>
    </div>
    </Link>
  )
}
