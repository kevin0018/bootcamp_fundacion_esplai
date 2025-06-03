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


