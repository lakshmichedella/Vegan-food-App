import Image from "next/image";
import {Navbar} from "../components/ui/navbar";

function Map() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d39448.509951781474!2d-80.52416504530215!3d43.46217509205705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sca!4v1757886417107!5m2!1sen!2sca"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
}

function App() {
  return (
    <div className="App">
        <Navbar/>
      <div className="flex" style={{height: "calc(100vh - 60px)" }}>
        <div className="flex-3">
          <Map />
        </div>

        <div className="flex-1 bg-inherit p-2">
          <h2>Explore</h2>
          <p>Dietary Options:</p>

          <input type="radio" value="vegetarian" />
          <label htmlFor="vegetarian">Vegetarian</label><br />
          <input type="radio" value="vegan" />
          <label htmlFor="vegan">Vegan</label><br />
          <input type="radio" value="halal" />
          <label htmlFor="halal">Halal</label><br /> 
          <input type="radio" value="kosher" />
          <label htmlFor="kosher">Kosher</label><br />  
          <input type="radio" value="gluten-free" />
          <label htmlFor="gluten-free">Gluten Free</label><br /> 


          <p>Restaurant Options:</p>
          <input type="radio" value="easia" />
          <label htmlFor="easia">East Asian</label><br />
          <input type="radio" value="sasia" />
          <label htmlFor="sasia">South Asia</label><br />
          <input type="radio" value="fast-food" />
          <label htmlFor="fast-food">Fast Food</label><br /> 
          <input type="radio" value="cafe" />
          <label htmlFor="cafe">Cafe</label><br />  
          <input type="radio" value="bakery" />
          <label htmlFor="bakery">Bakery/Ice Cream</label><br /> 






          <button className="px-[1rem] py-[0.5rem] mt-[1rem] border-solid border-2 border-neutral-500">Find restaurants!</button>


           </div>
      </div>
    </div>
  );
}

export default App;