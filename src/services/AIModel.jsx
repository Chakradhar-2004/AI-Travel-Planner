import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text:
            "Generate Travel Plan for Location: Las Vegas, for 3 days for a couple with a cheap budget. Provide a hotel options list (hotel names, hotel addresses, prices, hotel image URLs, geo coordinates, ratings, descriptions) and suggest an itinerary (placeName, placeDetails, place image URLs, geo coordinates, ticket pricing, travel time for each location). Each day plan should include the best time to visit. Return the response as a JSON object.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "tripDetails": {
    "location": "Las Vegas, Nevada",
    "duration": "3 Days",
    "budget": "Cheap/Budget-Friendly",
    "travelers": "Couple"
  },
  "hotelOptions": [
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "address": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
      "pricePerNight": 40,
      "imageUrl": "https://example.com/circuscircus.jpg",
      "geoCoordinates": {
        "latitude": 36.1355,
        "longitude": -115.1637
      },
      "ratings": 3.5,
      "description": "Budget-friendly option with a circus theme, Adventuredome indoor theme park, and various dining choices.  A bit older, but often offers great deals."
    },
    {
      "hotelName": "Excalibur Hotel & Casino",
      "address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
      "pricePerNight": 50,
      "imageUrl": "https://example.com/excalibur.jpg",
      "geoCoordinates": {
        "latitude": 36.0984,
        "longitude": -115.1746
      },
      "ratings": 4.0,
      "description": "Medieval-themed hotel at the south end of the Strip. Offers affordable rooms, a Tournament of Kings dinner show, and multiple pools."
    },
    {
      "hotelName": "Stratosphere Hotel, Casino & Tower",
      "address": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",
      "pricePerNight": 45,
      "imageUrl": "https://example.com/stratosphere.jpg",
      "geoCoordinates": {
        "latitude": 36.1474,
        "longitude": -115.1554
      },
      "ratings": 3.8,
      "description": "Located at the north end of the Strip, offers stunning views from the observation tower. Thrill rides are available for an extra cost. Rooms are generally basic but affordable."
    },
    {
      "hotelName": "Luxor Hotel & Casino",
      "address": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
      "pricePerNight": 60,
      "imageUrl": "https://example.com/luxor.jpg",
      "geoCoordinates": {
        "latitude": 36.0956,
        "longitude": -115.1759
      },
      "ratings": 4.1,
      "description": "Pyramid-shaped hotel with an Egyptian theme. Offers affordable rooms, various dining options, and entertainment."
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "South Strip Exploration & Free Entertainment",
      "bestTimeToVisit": "Afternoon/Evening",
      "activities": [
        {
          "placeName": "Welcome to Las Vegas Sign",
          "placeDetails": "Take a photo at the iconic 'Welcome to Las Vegas' sign.  Be prepared for a short wait in line.",
          "imageUrl": "https://example.com/lasvegassign.jpg",
          "geoCoordinates": {
            "latitude": 36.0828,
            "longitude": -115.1731
          },
          "ticketPricing": "Free",
          "travelTime": "15-minute drive from the Strip (depending on traffic)"
        },
        {
          "placeName": "Bellagio Conservatory & Botanical Garden",
          "placeDetails": "A free and stunning display of seasonal flowers and plants. Located inside the Bellagio Hotel.",
          "imageUrl": "https://example.com/bellagioconservatory.jpg",
          "geoCoordinates": {
            "latitude": 36.1127,
            "longitude": -115.1742
          },
          "ticketPricing": "Free",
          "travelTime": "Walk from the center Strip."
        },
        {
          "placeName": "Bellagio Fountains",
          "placeDetails": "Watch the free water show at the Bellagio fountains.  Shows run every 30 minutes during the day and every 15 minutes in the evening.",
          "imageUrl": "https://example.com/bellagiofountains.jpg",
          "geoCoordinates": {
            "latitude": 36.1127,
            "longitude": -115.1742
          },
          "ticketPricing": "Free",
          "travelTime": "Immediately outside the Bellagio."
        },
        {
          "placeName": "Walk the Strip",
          "placeDetails": "Enjoy the sights and sounds of the Las Vegas Strip.  People-watching is free!",
          "imageUrl": "https://example.com/lasvegasstrip.jpg",
          "geoCoordinates": {
            "latitude": 36.1146,
            "longitude": -115.1728
          },
          "ticketPricing": "Free",
          "travelTime": "Variable - as long as you like!"
        },
         {
          "placeName": "M&M's World",
          "placeDetails": "Four stories of M&M's madness.  A fun and colorful place to browse (and maybe buy some candy).",
          "imageUrl": "https://example.com/mmsworld.jpg",
          "geoCoordinates": {
            "latitude": 36.1083,
            "longitude": -115.1724
          },
          "ticketPricing": "Free admission (candy purchases extra)",
          "travelTime": "Walk from the center Strip."
        }
      ]
    },
    "day2": {
      "theme": "Downtown Las Vegas & Budget Entertainment",
      "bestTimeToVisit": "Afternoon/Evening",
      "activities": [
        {
          "placeName": "Fremont Street Experience",
          "placeDetails": "A pedestrian mall with a video screen canopy and free light shows.  Street performers and cheaper gambling can be found here.",
          "imageUrl": "https://example.com/fremontstreet.jpg",
          "geoCoordinates": {
            "latitude": 36.1703,
            "longitude": -115.1428
          },
          "ticketPricing": "Free",
          "travelTime": "20-minute drive or bus ride from the Strip."
        },
        {
          "placeName": "SlotZilla Zip Line",
          "placeDetails": "A fun zip line that runs above Fremont Street. Offers two different zip line experiences (lower and higher).",
          "imageUrl": "https://example.com/slotzilla.jpg",
          "geoCoordinates": {
            "latitude": 36.1703,
            "longitude": -115.1428
          },
          "ticketPricing": "Starting around $29.99",
          "travelTime": "Located on Fremont Street."
        },
        {
          "placeName": "Heart Attack Grill",
          "placeDetails": "A highly themed restaurant with very large (and unhealthy) burgers.  A unique (if slightly outrageous) dining experience.",
          "imageUrl": "https://example.com/heartattackgrill.jpg",
          "geoCoordinates": {
            "latitude": 36.1701,
            "longitude": -115.1423
          },
          "ticketPricing": "Entrees around $15-25",
          "travelTime": "Located on Fremont Street."
        },
        {
          "placeName": "Container Park",
          "placeDetails": "An open-air shopping and entertainment complex made from shipping containers.  Features a playground, restaurants, and shops.",
          "imageUrl": "https://example.com/containerpark.jpg",
          "geoCoordinates": {
            "latitude": 36.1681,
            "longitude": -115.1408
          },
          "ticketPricing": "Free admission (activities and purchases extra)",
          "travelTime": "Short walk from Fremont Street."
        }
      ]
    },
    "day3": {
      "theme": "High Roller Observation Wheel & Ethel M Chocolate Factory",
      "bestTimeToVisit": "Afternoon/Evening",
      "activities": [
       {
          "placeName": "LINQ Promenade",
          "placeDetails": "Outdoor shopping, dining and entertainment district",
          "imageUrl": "https://example.com/highroller.jpg",
          "geoCoordinates": {
            "latitude": 36.1167,
            "longitude": -115.1706
          },
          "ticketPricing": "Free Admission",
          "travelTime": "Central Las Vegas Strip"
        },
        {
          "placeName": "High Roller Observation Wheel",
          "placeDetails": "Offers a panoramic view of the city and the surrounding area.",
          "imageUrl": "https://example.com/highroller.jpg",
          "geoCoordinates": {
            "latitude": 36.1167,
            "longitude": -115.1706
          },
          "ticketPricing": "Approximately $25-37 (Daytime), $37-52 (Nighttime)",
          "travelTime": "Located at the LINQ Promenade"
        },
        {
          "placeName": "Ethel M Chocolate Factory & Cactus Garden",
          "placeDetails": "Take a free tour of the chocolate factory and stroll through the cactus garden",
          "imageUrl": "https://example.com/ethelm.jpg",
          "geoCoordinates": {
            "latitude": 36.0622,
            "longitude": -115.0608
          },
          "ticketPricing": "Free Admission",
          "travelTime": "Approximately 20-minute drive from the Strip"
        },
        {
          "placeName": "Lake Las Vegas",
          "placeDetails": "Enjoy a relaxing time by the lake, rent a paddle boat, or simply enjoy the scenery",
          "imageUrl": "https://example.com/lakelasvegas.jpg",
          "geoCoordinates": {
            "latitude": 36.1699,
            "longitude": -115.0260
          },
          "ticketPricing": "Free Admission",
          "travelTime": "Approximately 30-minute drive from the Strip"
        }
      ]
    }
  }
}`,
        },
      ],
    },
  ],
});