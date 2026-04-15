import {API} from "../api/api.js"
import { APIProvider, Map, MapCameraChangedEvent, InfoWindow, useAdvancedMarkerRef, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

const test_data = [
    {
        "id": "ChIJ73LbbhTL1IkRo0jIEIs3HaI",
        "resourceName": "places/ChIJ73LbbhTL1IkRo0jIEIs3HaI",
        "displayName": "JOEY King St",
        "location": {
            "lat": 43.649142399999995,
            "lng": -79.378951
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJ243-C381K4gRHMKWCGU86iM",
        "resourceName": "places/ChIJ243-C381K4gRHMKWCGU86iM",
        "displayName": "Black+Blue Toronto",
        "location": {
            "lat": 43.648099599999995,
            "lng": -79.3831247
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJmzR9dJU0K4gRj44f61gBfss",
        "resourceName": "places/ChIJmzR9dJU0K4gRj44f61gBfss",
        "displayName": "RASA",
        "location": {
            "lat": 43.6628186,
            "lng": -79.4041051
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJKSp50NI0K4gR6C6L3yYqpYY",
        "resourceName": "places/ChIJKSp50NI0K4gR6C6L3yYqpYY",
        "displayName": "Canoe",
        "location": {
            "lat": 43.6475793,
            "lng": -79.38090369999999
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJm5_QX940K4gRdtM5bxGf3g4",
        "resourceName": "places/ChIJm5_QX940K4gRdtM5bxGf3g4",
        "displayName": "Gusto 101",
        "location": {
            "lat": 43.645181099999995,
            "lng": -79.4001151
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJQY_nP9I0K4gRj0Fo9reXGQ4",
        "resourceName": "places/ChIJQY_nP9I0K4gRj0Fo9reXGQ4",
        "displayName": "Earls Kitchen + Bar",
        "location": {
            "lat": 43.6480411,
            "lng": -79.38439629999999
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJzVkW-Nk0K4gRd4dHDvA6ekU",
        "resourceName": "places/ChIJzVkW-Nk0K4gRd4dHDvA6ekU",
        "displayName": "KŌST",
        "location": {
            "lat": 43.6452114,
            "lng": -79.3923811
        },
        "businessStatus": "OPERATIONAL"
    },
    {
        "id": "ChIJJZP2IzPL1IkRoIXM5dEE9ck",
        "resourceName": "places/ChIJJZP2IzPL1IkRoIXM5dEE9ck",
        "displayName": "Richmond Station",
        "location": {
            "lat": 43.651453599999996,
            "lng": -79.3794917
        },
        "businessStatus": "OPERATIONAL"
    }
]

const MarkerWithInfoWindow = ({ place }: { place: any }) => {
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowOpen, setInfowindowOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        key={place.id}
        position={place.location}
        clickable={true}
        onClick={(ev) => {
          if (!map || !ev.latLng) return;
          map.panTo(ev.latLng);
          setInfowindowOpen(true);
        }}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker} 
          onCloseClick={() => setInfowindowOpen(false)}
          className="text-neutral-900"
        >
            <h1>{place.displayName}</h1>
            <p>{place.formattedAddress}</p>
            <a href={place.googleMapsURI}>View on Google Maps</a>
        </InfoWindow>
      )}
    </>
  );
};


const PlacesMarkers = (props: {placesLocs: any[]}) => {
    return (
        <>
        {props.placesLocs.map( (place: any) => (
            <MarkerWithInfoWindow place={place} key={place.id}/>
        ))}
        </>
    );
};


export const GMap = (props: {location: string, cuisine: string, diet: string, updatePlacesData: Dispatch<SetStateAction<any[]>> }) => {
    const [places, setPlaces] = useState<google.maps.places.Place[]>([]);
    const [center, setCenter] = useState( {lat: 43.6532, lng: -79.3832});

    const MAP_CONFIG = {
        mapId: "VeganPlacesMap",
        defaultZoom: 13,
        center: center,
        gestureHandling: 'greedy' as const,
        disableDefaultUI: true,
        
    };


    useEffect(() => {
        async function fetchData() {
            const result = await API(props.location, props.cuisine, props.diet); 
            console.log(result); 
            setPlaces(result);
            props.updatePlacesData(result);
        }

        async function getMapCenter() {

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address={${encodeURIComponent(props.location)}&components=country:CA&key=YOUR_API_KEY`,
                {
                method: 'GET',
            }
            );
            const address = await response.json();

            console.log("Coords: ", address)
            
            setCenter(address.results[0].geometry.location);
        }

        getMapCenter();
        fetchData();
        console.log(center);
    }, [props.location, props.cuisine, props.diet]);

    return (
    <>
        <APIProvider apiKey="YOUR_API_KEY">
            <div className="h-full w-full">
                <Map {...MAP_CONFIG} 
                onCameraChanged={ (ev: MapCameraChangedEvent) => {setCenter(ev.detail.center)}
                }>
                    <PlacesMarkers placesLocs={places} />
                </Map>
            </div>
        </APIProvider>


    </> 
    );
};
