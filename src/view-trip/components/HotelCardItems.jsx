import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "../../services/GlobalApis";

export default function HotelCardItems({ hotel }) {
  const Photo_Ref_Url =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_KEY;
  const [photo, setPhoto] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
        resp.data.places[0].photos[3].name;
        const photo_url = Photo_Ref_Url.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhoto(photo_url);
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.address
      }
      target="_blank"
      className="no-underline text-black"
    >
      <div className="hover:scale-105 no-underline text-black transition-all cursor-pointer">
        <img
          className="rounded h-[200px] w-full object-cover"
          src={photo}
          alt=""
        />
        <div className="my-2 flex flex-col">
          <h2 className="text-xm font-bold">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.address}</h2>
          <div className="flex justify-between pl-1 pr-3">
            <h2 className="text-sm font-semibold">
              {hotel?.pricePerNight}₹/
              <span className="text-xs text-gray-500">Night</span>
            </h2>
            <h2 className="text-xm">⭐️ {hotel?.ratings}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
