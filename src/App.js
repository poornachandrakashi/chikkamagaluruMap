import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";

export default function App() {
    const [viewport, setViewport] = useState({
      latitude: 13.3161,
      longitude: 75.7720,
      width: "100vw",
      height: "100vh",
      zoom: 10
    });
    const [selectedPark,setSelectedPark] = useState(null);

    useEffect(() => {
        const listener = e => {
          if (e.key === "Escape") {
            setSelectedPark(null);
          }
        };
        window.addEventListener("keydown", listener);
    
        return () => {
          window.removeEventListener("keydown", listener);
        };
      }, []);

    return <div>
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoicG9vcm5hY2hhbmRyYSIsImEiOiJja2s1Zzh5eDUwNjQ4Mm9xdjUzZzBtcXBkIn0.ZN1pQNlBFK9dL4zfQZXTyA"
        mapStyle="mapbox://styles/poornachandra/ckkkvhpb52s5517ryuc15xrpp"
        onViewportChange={viewport => {
            setViewport(viewport);
        
        }
        }
        >
            {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button className="marker-btn"
            onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
            <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
        </ReactMapGL>
    </div>
}