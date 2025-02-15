import React from 'react'

export default function SelectedInfo({trip}) {
  return (
    <div>
        <img src="/placeholder_img.jpg" className='h-[340px] w-full object-cover rounded'/>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelections?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-2 mx-3 bg-gray-200 rounded-full text-gray-500'>🗓️{trip?.userSelections?.noOfdays} Days</h2>
                <h2 className='p-2 mx-3 bg-gray-200 rounded-full text-gray-500'>💰{trip?.userSelections?.budget} Budget</h2>
                <h2 className='p-2 mx-3 bg-gray-200 rounded-full text-gray-500'>🏕️{trip?.userSelections?.companions
                }</h2>
            </div>
        </div>
    </div>
  )
}
