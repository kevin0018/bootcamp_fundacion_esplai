import { useContext, useEffect, useState } from "react";
import UserContext from "./contextos/UserContext.js";
import { useNavigate } from "react-router-dom";

import NocodbController from "./controllers/NocodbController.js";

function NuevoAlumno(){

    const { token } = useContext(UserContext);
    const tabla = "mievjgvwk2wef5x"
    const alumnosController = new NocodbController(tabla, token)

    const goTo = useNavigate()

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")

    function enviarAlumno(e){
        e.preventDefault();
        const nuevoAlumno = {
            nombre:nombre,
            email,
            telefono
        }

        alumnosController.updateItem(nuevoAlumno,1)
         .then(datos => {
            console.log(datos);
            goTo('/alumnos');
        })
        .catch(e => console.log(e))

    }


    return (
        <>
        <form onSubmit={enviarAlumno}>
            <p>Nombre</p>
            <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
            <br />

            <p>Email</p>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <br />

            <p>Telefono</p>
            <input type="text" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />
            <br />

            <button type="submit">ENVIAR ALUMNO</button>
            
        </form>
        
        
        </>
    )
}

export default NuevoAlumno;