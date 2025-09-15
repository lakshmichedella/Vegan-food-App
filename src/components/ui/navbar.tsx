export function Navbar(){
    return (
        <nav className="flex sticky top-0 bg-emerald-400 flex-column items-center">
            
            <div className="flex justify-self-start ml-2 mr-auto space-x-4">
                <p>Vegan Food App</p>
            </div>
            <div className="flex justify-self-end mr-2 ">
                <input className="bg-white text-black outline-none rounded-sm pl-1" 
                type="search" placeholder="Search for resturaunts, items, etc."/>
            </div>
            <div className="flex justify-self-end mr-2 ">
                <p>Profile</p>
            </div>
        </nav>
    );
}