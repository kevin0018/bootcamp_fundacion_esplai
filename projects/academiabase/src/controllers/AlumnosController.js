import NocodbController from "./NocodbController";

export default class AlumnosController extends NocodbController {

    constructor (token){
        super("mievjgvwk2wef5x", token)
    }

    getAlumnosCurso(idCurso){
        return this.getItems({
            "filter": {
                "Curso": {
                    "Id": idCurso
                }
            }
        });
    }
}