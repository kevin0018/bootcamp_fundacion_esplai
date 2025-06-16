// IMPORTS
import {useState} from "react";
import data from "../data/ciutats.json";
import {Table, Button, Form} from "react-bootstrap";

function R04() {

	const [filteredCities, setFilteredCities] = useState(data);
	const [minPopulation, setMinPopulation] = useState(20000);

	const filterByProvince = (province) => {
		const filtered = data.filter((city) => city.provincia === province);
		setFilteredCities(filtered);
	};

	// FILTER: By minimum population
	const filterByPopulation = (population) => {
		const filtered = data.filter((city) => city.poblacio >= population);
		setFilteredCities(filtered);
	};

	return (
		<div className = 'container mt-4'>
			<h2>CIUTATS</h2>
			<p>Part 1:</p>
			<ul>
				<li>Fer una taula que mostri les dades de l’arxiu ciutats.json en columnes</li>
				<li>Utilitzar taules de Bootstrap (veure exercici R05)</li>
			</ul>

			<p>Part 2:</p>
			<ul>
				<li>Posar un botó "Girona" que mostri només les ciutats de la provincia de Girona</li>
				<li>Posar un botó "Barcelona" que mostri només les ciutats de la provincia de Barcelona</li>
				<li>Posar un botó "Lleida" que mostri només les ciutats de la provincia de Lleida</li>
				<li>Posar un botó "Tarragona" que mostri només les ciutats de la provincia de Tarragona</li>
			</ul>

			<p>Part 3:</p>
			<ul>
				<li>Posar un “slider” per filtrar per població mínima, que vagi de 20.000 a 150.000 en increments de
					10.000
				</li>
			</ul>

			{/* Part 2: Buttons for provinces */}
			<div className = 'mt-4'>
				<Button variant = 'primary' onClick = {() => filterByProvince("Girona")}>
					Girona
				</Button>
				<Button variant = 'secondary' className = 'mx-2' onClick = {() => filterByProvince("Barcelona")}>
					Barcelona
				</Button>
				<Button variant = 'success' onClick = {() => filterByProvince("Lleida")}>
					Lleida
				</Button>
				<Button variant = 'danger' className = 'mx-2' onClick = {() => filterByProvince("Tarragona")}>
					Tarragona
				</Button>
				<Button variant = 'dark' onClick = {() => setFilteredCities(data)}>
					Mostrar todas
				</Button>
			</div>
			{/* Part 3: Slider for population */}
			<div className = 'mt-4'>
				<Form.Label>
					Filtrar por población mínima: {minPopulation.toLocaleString()} habitantes
				</Form.Label>
				<Form.Range
					min = {20000}
					max = {150000}
					step = {10000}
					value = {minPopulation}
					onChange = {(e) => {
						const population = parseInt(e.target.value, 10);
						setMinPopulation(population);
						filterByPopulation(population);
					}}
				/>
			</div>
			{/* Part 1: Table */}
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Provincia</th>
						<th>Población</th>
					</tr>
				</thead>
				<tbody>
					{filteredCities.map((city, index) => (
						<tr key = {index}>
							<td>{city.municipi}</td>
							<td>{city.provincia}</td>
							<td>{city.poblacio.toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default R04;