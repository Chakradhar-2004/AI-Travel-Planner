import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "../../services/GlobalApis";

export default function SelectedInfo({ trip }) {
  const Photo_Ref_Url =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_KEY;
  const [photo, setPhoto] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelections?.location?.label,
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
    <div>
      <img
        src={photo || "/placeholder_img.jpg"}
        className="h-[340px] w-full object-cover rounded"
      />
      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelections?.location?.label}
        </h2>
        <div className="flex gap-5">
          <h2 className="p-2 mx-3 bg-gray-200 rounded-full text-gray-500">
            🗓️{trip?.userSelections?.noOfdays} Days
          </h2>
          <h2 className="p-2 mx-3 bg-gray-200 rounded-full text-gray-500">
            💰{trip?.userSelections?.budget} Budget
          </h2>
          <h2 className="p-2 mx-3 bg-gray-200 rounded-full text-gray-500">
            🏕️{trip?.userSelections?.companions}
          </h2>
        </div>
      </div>
    </div>
  );
}
