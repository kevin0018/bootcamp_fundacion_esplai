import heroImg from '../assets/images/hero.jpg';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-start w-full">
            <h1 className="text-4xl font-bold text-secondary text-center">Bienvenido al Portal de Cursos</h1>
            <img src={heroImg} alt="Hero" className="mt-4 rounded-lg shadow-lg" style={{width: '700px', maxWidth: '100%'}} />
        </div>
    );
}