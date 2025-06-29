// IMPORTS
import {useState} from "react";

function Photos() {
	// STATE: Manage the selected vehicle
	const [selectedVehicle, setSelectedVehicle] = useState("bici");

	// Images for each vehicle
	const vehicleImages = {
		bici: "/images/bici.jpg",
		bus: "/images/bus.jpg",
		coche: "/images/coche.jpg",
		moto: "/images/moto.jpg",
	};

	return (
		<div style = {{textAlign: "center", padding: "1rem"}}>
			<h1>Selecciona un vehículo</h1>

			{/* Dropdown */}
			<select
				value = {selectedVehicle}
				onChange = {(e) => setSelectedVehicle(e.target.value)}
				style = {{
					fontSize: "1rem",
					padding: "0.5rem",
					borderRadius: "8px",
					cursor: "pointer",
				}}
			>
				<option value = 'coche'>Coche</option>
				<option value = 'moto'>Moto</option>
				<option value = 'bici'>Bici</option>
				<option value = 'bus'>Bus</option>
			</select>

			{/* Image */}
			<div style = {{marginTop: "1rem"}}>
				<img
					src = {vehicleImages[selectedVehicle]}
					alt = {selectedVehicle}
					style = {{
						maxWidth: "100%",
						height: "auto",
						borderRadius: "8px",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					}}
				/>
			</div>
		</div>
	);
}

export default Photos;