import { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/UserContext.js";

import CursosController from "./controllers/CursosController.js";

export default function Cursos() {

    const { nombre, token } = useContext(UserContext);

    //const urlApi = "https://app.nocodb.com/api/v2/tables/my1fh69qpiaxgma/records"
    const [cursos, setCursos] = useState([])

    const cursosController = new CursosController(token)

    useEffect( () => {
        cursosController.getAllItems2()
        .then(datos => setCursos(datos))
        .catch(e => console.log(e))

    }, [])


    return (
        <>
            <h3>CURSOS </h3>
            <hr />
            <ul>
                {cursos.map(curso => <li>{curso.Title}</li>)}
            </ul>
        </>
    )
}
