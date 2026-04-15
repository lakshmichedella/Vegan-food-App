"use client";
import { useState } from "react";
import RestaurantCard from "../components/ui/RestaurantCard";
import Link from 'next/link';
import {GMap} from "../components/ui/Map"

const dummyData = [
  { id: 1, name: "Fantastic Wok", status: "Closes in 2 hours", cuisine: "Chinese", rating: 3, imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=200" },
  { id: 2, name: "India Gate", status: "Closes in 4 hours", cuisine: "Indian", rating: 4, imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200" },
  { id: 3, name: "Sushi Island", status: "Closes in 1 hour", cuisine: "Japanese", rating: 4, imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200" },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [mapData, setMapData] = useState({location: "Toronto", cuisine: "", diet: "vegan"});
  const [dietOptions, setDietOptions] = useState([
    {diet: "Gluten Free", checked: false},
    {diet: "Lactose free", checked: false}, 
    {diet: "Vegetarian", checked: false}, 
    {diet: "Kosher", checked: false}, 
    {diet: "Vegan", checked: false}, 
    {diet: "Halal", checked: false}
    ])
    const [placesData, setPlacesData] = useState(dummyData)

    console.log("Place data", placesData)

  return (
    <main className="min-h-screen bg-[#EDEDED] p-12 font-sans flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-7xl font-light tracking-[0.1em] mb-12 text-black uppercase">
          Vegan Food App
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 w-full">
            <div className="bg-[#D9D9D9] h-[500px] rounded-[40px] overflow-hidden shadow-sm mb-10 border-4 border-white">
              <GMap location={mapData.location} cuisine={mapData.cuisine} diet={mapData.diet} updatePlacesData={setPlacesData} />
            </div>
            
            <div className="flex flex-col items-center w-full">
              <h2 className="uppercase text-xl tracking-tight mb-6 font-normal">
                Choose your requirements:
              </h2>
              <div className="grid grid-cols-2 gap-x-16 gap-y-1 text-lg">
                {dietOptions.map(({diet, checked}, index) => (
                  <label key={diet} className="flex items-center gap-3 cursor-pointer text-neutral-950">
                    <input type="checkbox" className="w-5 h-5 border-black rounded-none" defaultChecked={checked} onChange={(ev) => {dietOptions[index]["checked"] = !checked; setDietOptions(dietOptions);}}/> 
                    {diet}
                  </label>
                ))}
              </div>
              <button 
                onClick={() => {setSubmitted(true); setMapData({location: "Waterloo", cuisine: "", diet: dietOptions.filter(({checked}) => checked === true).map(({diet}) => diet).join(" or ") })}}
                className="mt-10 bg-[#D9D9D9] px-16 py-2 rounded-[15px] shadow-sm hover:bg-gray-400 transition uppercase text-xl"
              >
                {submitted ? "New Search" : "Submit"}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[450px] bg-[#D1D1D1] rounded-[60px] p-8 min-h-[600px] flex flex-col items-center">
            {!submitted ? (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <p className="text-xl leading-relaxed text-[#555] uppercase max-w-[250px]">
                  Choose your requirements and press submit to see suitable restaurants ...
                </p>
              </div>
            ) : (
              <div className="w-full">
                <p className="text-right text-[10px] uppercase mb-4 tracking-widest text-gray-600">Here's what we found:</p>
                <div className="space-y-4">
                  {placesData.map((res) => (
                    <RestaurantCard key={res.id} {...res} />
                  ))}
                </div>
                    <Link href="/all-results" className="w-full">
                      <button className="mt-8 bg-[#E0E0E0] w-[80%] py-6 rounded-[30px] shadow-md hover:bg-gray-200 transition uppercase text-[10px] font-bold tracking-widest text-gray-600 mx-auto block">
                        More Results
                      </button>
                    </Link>   
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}