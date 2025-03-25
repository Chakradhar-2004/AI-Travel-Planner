import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../constants/firebase.jsx";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AuthModal from "../constants/authModel.jsx";
import {
  AI_PROMT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/options";
import { chatSession } from "../services/AIModel";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState(null);
  
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData?.budget || !formData?.companions || !formData?.noOfdays || !formData?.location) {
      toast("Please fill all details");
      return false;
    }
    return true;
  };
  
  const onGenerateTrip = async () => {
    if (!validateForm()) return;
    
    if (!auth.currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMT
        .replace('{location}', formData?.location?.label)
        .replace("{totalDays}", formData?.noOfdays)
        .replace("{companions}", formData?.companions)
        .replace("{budget}", formData?.budget);

      console.log('Generated Prompt:', FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      
      // Try to parse the response as JSON
      let tripData;
      try {
        const cleanedText = responseText.replace(/```json|```/g, '').trim();
        tripData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        toast.error('Error processing AI response. Please try again.');
        return;
      }

      // Validate the parsed data
      if (!tripData.tripDetails || !tripData.hotelOptions || !tripData.itinerary) {
        toast.error('Invalid trip data format received. Please try again.');
        return;
      }
      // console.log(tripData);
      await saveTripData(tripData);
      
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error('Error generating trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveTripData = async (tripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      
      await setDoc(doc(db, "AI-Trip", docId), {
        userSelections: formData,
        TripData: tripData,
        userEmail: user?.email,
        id: docId,
        createdAt: new Date().toISOString()
      });

      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Error saving trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-4xl">
          Tell Us About Your Dream Trip🏕️🏝️
        </h2>
        <p className="mt-3 text-gray-500 text-2xl">
          We'll tailor your travel experience to match your style and
          preferences. Just answer a few quick questions!
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {/* Location Search */}
          <div>
            <h2 className="my-1 text-xl font-medium">
              Where would you like to explore?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY}
              selectProps={{
                place,
                onChange:(v)=>{(setPlace(v), handleInputChange('location',v))}
              }}
            />

          </div>

          {/* Number of Days */}
          <div>
            <h2 className="text-xl my-1 font-medium">
              How many Days are you planning?
            </h2>
            <input
              type="number"
              placeholder="Ex: 4"
              min="1"
              className="border rounded-md p-2 w-full bg-white"
              onChange={(e) => handleInputChange("noOfdays", e.target.value)}
            />
          </div>
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-2xl font-bold mt-4">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className="text-2xl font-bold mt-4">
            Who do you plan on traveling with your trip?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.companions === item.people &&
                  "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("companions", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="my-5 flex justify-center p-2">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? 
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/> 
            : 'Generate Trip'}
        </Button>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
