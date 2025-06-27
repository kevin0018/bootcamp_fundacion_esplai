import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [13, 41],
});

// Helper component to move map center
function MapCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 16, { animate: true });
  }, [position, map]);
  return null;
}

const BicingBCN = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [minBikes, setMinBikes] = useState(0);
  const [onlyEbikes, setOnlyEbikes] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  // Fetch stations from API
  useEffect(() => {
    fetch("https://api.citybik.es/v2/networks/bicing")
      .then(res => res.json())
      .then(data => {
        setStations(data.network.stations);
        setLoading(false);
      })
      .catch(err => {
        setError("Error al cargar los datos: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Apply filters
  const filteredStations = stations.filter(station => {
    const matchesName = station.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesMinBikes = Number(station.free_bikes) >= minBikes;
    const matchesEbikes = !onlyEbikes || Number(station.ebikes || 0) > 0;
    return matchesName && matchesMinBikes && matchesEbikes;
  });

  // Default map center (Barcelona)
  const defaultCenter = [41.3888, 2.159];
  const mapPosition = selectedStation
    ? [selectedStation.latitude, selectedStation.longitude]
    : defaultCenter;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Bicing BCN</h2>
      <form className="row g-3 mb-3">
        <div className="col-md-4 d-flex flex-column">
          <label className="form-label">Filtrar por nombre</label>
          <input
            type="text"
            className="form-control"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            placeholder="Nombre de la estación"
          />
        </div>
        <div className="col-md-4 d-flex flex-column justify-content-end">
          <label className="form-label">Mostrar Bicis Eléctricas</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={onlyEbikes}
              id="onlyEbikes"
              onChange={e => setOnlyEbikes(e.target.checked)}
            />
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column">
          <label className="form-label d-flex align-items-center">
            Min bicis libres:
            <span className="fw-bold ms-2">{minBikes}</span>
          </label>
          <input
            type="range"
            className="form-range"
            min={0}
            max={Math.max(20, ...stations.map(s => Number(s.free_bikes) || 0))}
            value={minBikes}
            onChange={e => setMinBikes(Number(e.target.value))}
          />
        </div>
      </form>
      <div className="my-4" style={{ height: "400px", width: "100%" }}>
        <MapContainer center={mapPosition} zoom={selectedStation ? 16 : 13} style={{ height: "100%", width: "100%" }}>
          <MapCenter position={mapPosition} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredStations.map(station => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={customIcon}
              eventHandlers={{
                click: () => setSelectedStation(station),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={selectedStation && selectedStation.id === station.id}>
                <div style={{ minWidth: 120 }}>
                  <strong>{station.name}</strong><br />
                  Bicis: {station.free_bikes}<br />
                  Ebikes: {station.ebikes || 0}<br />
                  Slots: {station.empty_slots}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Estación</th>
            <th>Bicis disponibles</th>
            <th>Bicis eléctricas</th>
            <th>Slots vacíos</th>
            <th>Lat</th>
            <th>Long</th>
          </tr>
        </thead>
        <tbody>
          {filteredStations.map(station => (
            <tr key={station.id}>
              <td>{station.name}</td>
              <td>{station.free_bikes}</td>
              <td>{station.ebikes || 0}</td>
              <td>{station.empty_slots}</td>
              <td>
                <button
                  className="btn btn-link p-0"
                  style={{ color: '#0d6efd', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={e => {
                    e.preventDefault();
                    setSelectedStation(station);
                  }}
                >
                  {station.latitude}
                </button>
              </td>
              <td>{station.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BicingBCN;
