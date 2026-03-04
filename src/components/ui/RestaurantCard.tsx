export default function RestaurantCard({ name, status, cuisine, rating, imageUrl }: any) {
  return (
    <div className="flex items-center justify-between bg-[#E0E0E0] rounded-[25px] p-4 w-full shadow-sm">
      <div className="flex flex-col text-left">
        <h3 className="font-bold text-base leading-tight">{name}</h3>
        <p className="text-[12px] text-gray-700">{status}</p>
        <p className="text-[12px] text-gray-700">{cuisine}</p>
        <div className="flex mt-1 text-xs">
          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <img src={imageUrl} alt={name} className="w-20 h-14 rounded-xl object-cover" />
        <button className="bg-[#B7B7B7] text-[9px] px-3 py-1 rounded-md uppercase">
          Directions →
        </button>
      </div>
    </div>
  );
}