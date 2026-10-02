import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./SindhMap.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const locations = [
  {
    name: "Sakrand",
    lat: 26.14,
    lng: 68.27,
    varieties: ["IV-2", "IV-3", "MPT-14", "E-107"],
  },
  {
    name: "Matiari",
    lat: 25.60,
    lng: 68.45,
    varieties: ["IV-2", "IV-3", "E-107"],
  },
  {
    name: "Tando Jam",
    lat: 25.43,
    lng: 68.53,
    varieties: ["IV-3", "MPT-14"],
  },
  {
    name: "Qazi Ahmed",
    lat: 26.10,
    lng: 68.52,
    varieties: ["E-107", "IV-3"],
  },
  {
    name: "Shahdadpur",
    lat: 25.93,
    lng: 68.63,
    varieties: ["E-107", "IV-2"],
  },
];

function SindhMap() {
  return (
    <div className="map-page">

      <div className="map-heading">
        <span>🗺️ LOCATION INTELLIGENCE</span>

        <h2>
          Sindh Variety Map
        </h2>

        <p>
          Explore research locations and varieties available
          in different areas of Sindh.
        </p>
      </div>

      <MapContainer
        center={[25.8, 68.5]}
        zoom={7}
        className="sindh-map"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (

          <Marker
            key={location.name}
            position={[location.lat, location.lng]}
            icon={defaultIcon}
          >

            <Popup>

              <strong>
                {location.name}
              </strong>

              <br />

              <span>
                Suitable / documented varieties:
              </span>

              <br />

              🌾 {location.varieties.join(", ")}

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}

export default SindhMap;