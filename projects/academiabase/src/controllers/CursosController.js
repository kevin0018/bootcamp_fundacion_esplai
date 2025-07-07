import NocodbController from "./NocodbController";

export default class CursosController extends NocodbController {

    constructor (token){
        super("my1fh69qpiaxgma", token)
        this.NombreTabla="Cursos"
    }
}