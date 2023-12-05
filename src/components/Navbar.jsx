import Link from "next/link";

export default function Navbar() {
    return (
        <div id="navbar-component">
            <div className="flex flex-row justify-between bg-primary m-1 p-6 rounded-xl mb-2">
                <div className="text-xl font-bold p-1">PRUEBA TÉCNICA: ETAPA II</div>
                <div className="text-lg font-semibold flex flex-row">
                    <div className="hover:bg-secondary-100 hover:rounded-xl p-2">
                        <Link href="/">Inicio</Link>
                    </div>
                    <div className="hover:bg-secondary-100 hover:rounded-xl p-2">
                        <Link href="/#">Nuestra Empresa</Link>
                    </div>
                    <div className="hover:bg-secondary-100 hover:rounded-xl p-2">
                        <Link href="/#">Registrarse</Link>
                    </div>
                    <div className="hover:bg-secondary-100 hover:rounded-xl p-2">
                        <Link href="/#">Iniciar Sesión</Link>
                    </div>
                    <div className="hover:bg-secondary-100 hover:rounded-xl p-2">
                        <Link href="/#">Contáctanos</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}