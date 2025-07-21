import { useState } from 'react';
export default function R13() {
  const [date, setDate] = useState("");
  const [resultFecha, setResultFecha] = useState(null);
  const [resultComparar, setResultComparar] = useState(null);
  const [resultDias, setResultDias] = useState(null);
  const [resultSumar, setResultSumar] = useState(null);
  const [resultEdad, setResultEdad] = useState(null);
  const [resultDiaSemana, setResultDiaSemana] = useState(null);
  const [resultValidacion, setResultValidacion] = useState(null);
  const [resultAcumulado, setResultAcumulado] = useState(null);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return setResultFecha(null);
    const d = new Date(date);
    const dia = d.getDate();
    const mes = meses[d.getMonth()];
    const anio = d.getFullYear();
    setResultFecha(`${dia} - ${mes} - ${anio}`);
  };

  return (
    <div>
      <h2 className='text-light text-center mb-4 mt-3'>Ejercicio de fechas</h2>
      <p><b>Selecciona una data:</b> Haz un formulario con un input type="date" y muestra el dia, mes y año por separado (ex: 21 - julio - 2025)</p>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {resultFecha && (
        <div className="mt-3">
          <b>Fecha seleccionada:</b> {resultFecha}
        </div>
      )}
      <p className='mt-3'><b>Compara con hoy:</b> El usuario selecciona una fecha y el programa muestra si es antes, despues o igual a la fecha actual</p>
      <form onSubmit={e => {
        e.preventDefault();
        if (!date) return setResultComparar("No se ha seleccionado ninguna fecha");
        const d = new Date(date);
        const today = new Date();
        if (d.toDateString() === today.toDateString()) setResultComparar("La fecha es igual a hoy");
        else if (d < today) setResultComparar("La fecha es anterior a hoy");
        else setResultComparar("La fecha es posterior a hoy");
      }}>
        <button type="submit">Comparar con hoy</button>
      </form>
      {resultComparar && (
        <p className="mt-2"><b>Resultado comparación:</b> {resultComparar}</p>
      )}
      <p className='mt-3'><b>Calcula los dias restantes:</b> Pide una fecha futura (ex: final del curso) y muestra cuantos días faltan desde hoy hasta esa fecha.</p>
      <form onSubmit={e => {
        e.preventDefault();
        if (!date) return setResultDias("No se ha seleccionado ninguna fecha");
        const today = new Date();
        const futureDate = new Date(date);
        const diffTime = futureDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setResultDias(diffDays >= 0 ? `Faltan ${diffDays} días para la fecha seleccionada` : "La fecha seleccionada ya ha pasado");
      }}>
        <button type="submit">Calcular días restantes</button>
      </form>
      {resultDias && (
        <p className="mt-2"><b>Días restantes:</b> {resultDias}</p>
      )}
      <p className='mt-3'><b>Fecha + N dias:</b> El usuario entra una fecha y un numero (ej: 10), y el programa muestra cual sera la fecha resultante sumando estos dias.</p>
      <form onSubmit={e => {
        e.preventDefault();
        const daysToAdd = parseInt(prompt("Introduce el número de días a sumar:"));
        if (isNaN(daysToAdd) || daysToAdd < 0) {
          alert("Por favor, introduce un número válido de días.");
          return;
        }
        if (!date) {
          alert("Selecciona primero una fecha.");
          return;
        }
        const futureDate = new Date(date);
        futureDate.setDate(futureDate.getDate() + daysToAdd);
        setResultSumar(`${futureDate.getDate()} - ${meses[futureDate.getMonth()]} - ${futureDate.getFullYear()}`);
      }}>
        <button type="submit">Sumar días</button>
      </form>
      {resultSumar && (
        <div className="mt-3">
          <b>Fecha resultante:</b> {resultSumar}
        </div>
      )}
      <p className='mt-3'><b>Calcula una edad:</b> El usuario introduce su fecha de nacimiento y se muestra cuantos años, dias y horas han pasado.</p>
      <form onSubmit={e => {
        e.preventDefault();
        const birthDate = prompt("Introduce tu fecha de nacimiento (DD-MM-YYYY):");
        if (!birthDate) return;
        const [day, month, year] = birthDate.split('-').map(Number);
        const birth = new Date(year, month - 1, day);
        const today = new Date();
        const ageInMilliseconds = today - birth;
        const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
        const ageInYears = Math.floor(ageInDays / 365);
        const ageInHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
        setResultEdad(`${ageInYears} años, ${ageInDays} días, ${ageInHours} horas`);
      }}>
        <button type="submit">Calcular edad</button>
      </form>
      {resultEdad && (
        <div className="mt-3">
          <b>Edad calculada:</b> {resultEdad}
        </div>
      )}
      <p className='mt-3'><b>Dia de la semana: </b>El usuario escogera una fecha y el programa le dira que dia de la semana es (Ej: lunes)</p>
      <form onSubmit={e => {
        e.preventDefault();
        if (!date) return alert("Selecciona primero una fecha.");
        const selectedDate = new Date(date);
        const options = { weekday: 'long' };
        const dayOfWeek = selectedDate.toLocaleDateString('es-ES', options);
        setResultDiaSemana(dayOfWeek);
      }}>
        <button type="submit">Calcular día de la semana</button>
      </form>
      {resultDiaSemana && (
        <div className="mt-3">
          <b>Día de la semana:</b> {resultDiaSemana}
        </div>
      )}
      <p className='mt-3'><b>Validación de mayoria de edad: </b>Pide la edad de nacimiento y solamente permite continuar si el usuario tiene 18 años o más.</p>
      <form onSubmit={e => {
        e.preventDefault();
        const birthDate = prompt("Introduce tu fecha de nacimiento (DD-MM-YYYY):");
        if (!birthDate) return;
        const [day, month, year] = birthDate.split('-').map(Number);
        const birth = new Date(year, month - 1, day);
        const today = new Date();
        const ageInMilliseconds = today - birth;
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
        if (ageInYears >= 18) {
          setResultValidacion("Eres mayor de edad, puedes continuar.");
        } else {
          setResultValidacion("Lo siento, debes ser mayor de edad para continuar.");
        }
      }}>
        <button type="submit">Validar edad</button>
      </form>
      {resultValidacion && (
        <div className="mt-3">
          <b>Validación de edad:</b> {resultValidacion}
        </div>
      )}
      <p><b>Acumulado:</b> Un formulario muestra dos inputs numericos: minutos por semana y años. Clicando un boton nos ha de decir cuantos dias y horas totalizan los minutos semanales a lo largo de los años indicados. Por ejemplo, 12 minutos a la semana * 10 años serian 4 dias, 6 horas</p>
      <form onSubmit={e => {
        e.preventDefault();
        const minutosPorSemana = parseInt(prompt("Introduce los minutos por semana:"));
        const anos = parseInt(prompt("Introduce el número de años:"));
        if (isNaN(minutosPorSemana) || isNaN(anos) || minutosPorSemana < 0 || anos < 0) {
          alert("Por favor, introduce valores válidos.");
          return;
        }
        const totalMinutos = minutosPorSemana * 52 * anos; // 52 semanas al año
        const totalDias = Math.floor(totalMinutos / (60 * 24));
        const totalHoras = Math.floor((totalMinutos % (60 * 24)) / 60);
        setResultAcumulado(`${totalDias} días, ${totalHoras} horas`);
      }}>
        <button type="submit">Calcular acumulado</button>
      </form>
      {resultAcumulado && (
        <div className="mt-3 mb-4">
          <b>Acumulado:</b> {resultAcumulado}
        </div>
      )}
    </div>
  );
}