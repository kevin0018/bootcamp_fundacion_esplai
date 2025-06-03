// Motos
const response = await fetch('./motos.json');
if (!response.ok) {
    throw new Error('Failed to load JSON');
}
const motos = await response.json();
// La moto más cara y más barata
const prices = motos.map(moto => moto.eur);
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);
console.log(`La moto más cara cuesta ${maxPrice} eur y la más barata ${minPrice} eur.`);

// ¿Cuántas motos hay con menos de 30.000 km de la marca HONDA?
const hondaCount = motos.filter(moto => moto.km < 30000 && moto.marca === 'HONDA').length;
console.log(`Hay ${hondaCount} motos HONDA con menos de 30.000 km.`);

// ¿Cuantas motos hay con menos de 30.000 km de más de 240cc?
const filteredMotos = motos.filter(moto => moto.km < 30000 && moto.cc > 240);
console.log(`Hay ${filteredMotos.length} motos con menos de 30.000 km y más de 240cc.`);

// ¿Qué moto tiene menos de 25.000 km,, más de 350cc de cilindrada y cuesta entre 1.800 y 2.200 eur?
const specificMoto = motos.find(moto => moto.km < 25000 && moto.cc > 350 && moto.eur >= 1800 && moto.eur <= 2200);
if (specificMoto) {
    console.log(`La moto que cumple los criterios es: ${specificMoto.marca} ${specificMoto.model}, ${specificMoto.km} km, ${specificMoto.cc} cc, ${specificMoto.eur} eur.`);
}

// Una lista de marcas distintas con el número de motos de cada una.
const brandCount = motos.reduce((acc, moto) => {
    acc[moto.marca] = (acc[moto.marca] || 0) + 1;
    return acc;
}, {});
console.log('Número de motos por marca:');
Object.entries(brandCount).forEach(([marca, count]) => {
    console.log(`${marca}: ${count}`);
});


// ------------------------------
// Bicing 
const res = await fetch('./bicing.json');
if (!res.ok) {
    throw new Error('Failed to load JSON');
}
const bicing = await res.json();

/* 
    Función que nos devuelva la estación con 
    más bicicletas libres. (sort con función
    compare personalizada, de más a menos
    bicis libres, tomar primer elemento)
*/
function getStationWithMostBikes(bicing) {
    return bicing.sort((a, b) => b.free_bikes - a.free_bikes)[0];
}
const stationWithMostBikes = getStationWithMostBikes(bicing);
console.log(`La estación con más bicicletas libres es: ${stationWithMostBikes.name} con ${stationWithMostBikes.free_bikes} bicicletas libres.`);

/*
    Función que nos devuelva un array de
    nombres de estaciones que no tienen
    bicicletas libres (filter+map).
*/

function getStationsWithoutBikes(bicing) {
    return bicing.filter(station => station.free_bikes === 0).map(station => station.name);
}
const stationsWithoutBikes = getStationsWithoutBikes(bicing);
console.log('Estaciones sin bicicletas libres:');
stationsWithoutBikes.forEach(name => console.log(name));

/*
    Función que devuelva las X estaciones más
    cercanas a la ubicación 41.388163,
    2.179769.

    Cálculo de distancia entre (x,y) y (x',y'):
        Raíz cuadrada de la suma de los
        cuadrados de (y-y') y (x-x').

    Utilizar sort basado en esta distancia.
*/
function getClosestStations(bicing, lat, lon, x = 5) {
    return bicing
        .map(station => ({
            ...station,
            distance: Math.sqrt(Math.pow(station.latitude - lat, 2) + Math.pow(station.longitude - lon, 2))
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, x)
        .map(station => station.name);
}
const closestStations = getClosestStations(bicing, 41.388163, 2.179769);
console.log('Estaciones más cercanas:');
closestStations.forEach(name => console.log(name));