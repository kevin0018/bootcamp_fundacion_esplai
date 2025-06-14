function Buildings({ buildings }) {
	return (
		<table style={{ width: '100%', borderCollapse: 'collapse' , marginTop: '20px', border: '1px solid #ccc'}}>
			<thead style={{ borderBottom: '2px solid #ccc'}}>
				<tr>
					<th>Nombre</th>
					<th>Ciudad</th>
					<th>Pais</th>
					<th>Altura (m)</th>
					<th>Año</th>
					<th>Pisos</th>
				</tr>
			</thead>
			<tbody>
				{buildings.map((building, index) => (
					<tr key={index}>
						<td>{building.name}</td>
						<td>{building.city}</td>
						<td>{building.country}</td>
						<td>{building.height_m}</td>
						<td>{building.year}</td>
						<td>{building.floors}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Buildings;