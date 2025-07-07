import { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/UserContext.js";
import { Link } from "react-router-dom";
import AlumnosController from "./controllers/AlumnosController.js";

export default function Alumnos() {

  const { name, token } = useContext(UserContext);

  const alumnesController = new AlumnosController(token);


  const [alumnos, setAlumnos] = useState([])

  /*
  useEffect(async () => {

      const datos = await alumnesController.getAllItems();
      setAlumnos(datos)

  }, [])
*/


  function cargarDatos() {
    alumnesController.getAllItems2()
      .then(datos => setAlumnos(datos))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  function eliminar(id) {
    console.log("eliminando" + id)
    alumnesController.deleteItem(id)
      .then(x => cargarDatos())
  }

  return (
    <>
      <h3>ALUMNOS </h3>
      <hr />
      <ul>
        {alumnos.map(alumno => <li key={alumno.Id} >{alumno.name}{' '}<button onClick={() => eliminar(alumno.Id)}>X</button> </li>)}
      </ul>
      <hr />
      <Link to={`/nuevo-alumno`}> Nuevo alumno</Link>{' '}
    </>
  )
}
