"use client";
import Link from 'next/link';
import RestaurantCard from "../../components/ui/RestaurantCard";

const allRestaurantsData = Array(9).fill({
  name: "Fantastic Wok",
  status: "Closes in 2 hours",
  cuisine: "Chinese",
  rating: 3,
  imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=200"
});

export default function AllResults() {
  return (
    <main className="min-h-screen bg-[#EDEDED] p-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-6xl font-light tracking-[0.15em] mb-8 text-black uppercase text-center">
          Vegan Food App
        </h1>
        
        <p className="text-center text-sm uppercase mb-12 tracking-widest text-gray-500 font-bold">
          Here's what we found:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {allRestaurantsData.map((res, index) => (
            <div key={index} className="w-full max-w-[320px]">
              <RestaurantCard {...res} />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8 w-full">
          <div className="flex items-center gap-4 bg-[#D1D1D1] px-6 py-2 rounded-xl">
            <button className="font-bold">{"<"}</button>
            <span className="text-[10px] font-bold tracking-widest uppercase">Pg. 1 of 5</span>
            <button className="font-bold">{">"}</button>
          </div>

          <Link href="/" className="self-end lg:mr-10">
            <button className="bg-[#D1D1D1] px-12 py-3 rounded-2xl shadow-md hover:bg-gray-300 transition uppercase text-sm font-bold tracking-widest">
              Go Back ..
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}