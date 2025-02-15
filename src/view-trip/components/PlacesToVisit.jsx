import React from 'react';
import PlacesCardItem from './PlacesCardItem';

export default function PlacesToVisit({ trip }) {
  const itinerary = trip?.TripData?.itinerary || {};

  return (
    <div>
      <h1 className='font-bold text-2xl'>Places To Visit</h1>
      <div>
        {Object.entries(itinerary)
          .sort(([dayA], [dayB]) => {
            // Extract numeric value from day (e.g., "day1" → 1, "day3" → 3)
            const numA = parseInt(dayA.replace(/\D/g, ""), 10);
            const numB = parseInt(dayB.replace(/\D/g, ""), 10);
            return numA - numB; // Sort numerically
          })
          .map(([day, details], index) => (
            <div key={index} className="border p-3 my-2 rounded shadow">
              <h2 className="font-semibold text-lg">{day}</h2>
              <div>
                <h2 className='font-medium text-orange-500 text-sm'>{details.bestTimeToVisit}</h2>
                <PlacesCardItem details={details} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
