import { Link, Outlet } from "react-router-dom";
import Vallvidrera from "./parks/Vallvidrera";
import Collserola from "./parks/Collserola";
import Montserrat from "./parks/Montserrat";
import Garraf from "./parks/Garraf";
import Montseny from "./parks/Montseny";
import Llobregat from "./parks/Llobregat";
import Llobregat2 from "./parks/Llobregat2";
import Pedraforca from "./parks/Pedraforca";
import Mola from "./parks/Mola";

export default function R12() {
    return (
        <div>
            <h2 className='text-light text-center mb-4 mt-3'>Ejercicio 12</h2>
            <h2>Los mejores parques naturales cerca de Barcelona</h2>
            <nav className="flex flex-col items-center my-8" style={{ rowGap: '2rem' }}>
                <Link to="/r12/parks/vallvidrera" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Vallvidrera</Link>
                <Link to="/r12/parks/collserola" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Collserola</Link>
                <Link to="/r12/parks/montserrat" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Montserrat</Link>
                <Link to="/r12/parks/garraf" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Garraf</Link>
                <Link to="/r12/parks/montseny" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Montseny</Link>
                <Link to="/r12/parks/llobregat" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Llobregat</Link>
                <Link to="/r12/parks/llobregat2" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Llobregat II</Link>
                <Link to="/r12/parks/pedraforca" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Pedraforca</Link>
                <Link to="/r12/parks/mola" className="text-blue-600 underline text-lg" style={{padding: '12px 0'}}>Mola</Link>
            </nav>
            <div className="w-100 d-flex justify-content-center">
                <Outlet />
            </div>
        </div>
    );
}