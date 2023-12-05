import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/app/firebaseInit';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function New() {
    const router = useRouter();
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [voted, setVoted] = useState(null);

    const addUserData = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, 'users'), {
                id,
                name,
                percentage,
                voted,
            });

            console.log(`Usuario ${docRef.id} creado con éxito`);
            router.push('/');
        } catch (error) {
            console.error('Error al agregar datos del usuario:', error);
        }
    };

    return (
        <div id="new-data-user">
            <div className="bg-primary mx-1 py-3 rounded-xl">
                <h3 className="text-center font-bold text-xl">Agregar Información de Usuario</h3>
            </div>
            <div className="flex flex-row justify-center bg-primary m-2 rounded-xl">
                <form onSubmit={addUserData} className="flex flex-col w-1/2 bg-primary m-2 rounded-xl p-4">
                    <div className="flex flex-row justify-between py-2 bg-secondary-200 m-1 px-2 rounded-lg">
                        <label >ID</label>
                        <input
                            type="number"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between py-2 bg-secondary-200 m-1 px-2 rounded-lg">
                        <label >Nombre</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between py-2 bg-secondary-200 m-1 px-2 rounded-lg">
                        <label >Porcentaje</label>
                        <input
                            type="number"
                            id="percentage"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                            required
                            min="0"
                            max="100"
                            step="0.000000000000000001"
                        />
                    </div>
                    <div className="flex flex-row justify-between py-2 bg-secondary-200 m-1 px-2 rounded-lg">
                        <label >Votado</label>
                        <input
                            type="number"
                            id="voted"
                            value={voted}
                            onChange={(e) => setVoted(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-around">
                        <div className="bg-secondary-200 rounded-lg p-3 -space-x-3 hover:bg-blue-400">
                            <button type="submit">Agregar datos</button>
                        </div>
                        <div className="bg-secondary-200 rounded-lg p-3 -space-x-3 hover:bg-blue-400">
                            <Link href="/">Cancelar</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
