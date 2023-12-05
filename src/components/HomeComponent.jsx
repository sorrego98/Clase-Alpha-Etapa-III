import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/app/firebaseInit';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function HomeComponent() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        querySnapshot.forEach((doc) => {
            const data = {
                doc_id: doc.id,
                id: doc.data().id,
                name: doc.data().name,
                percentage: doc.data().percentage,
                voted: doc.data().voted,
            };
            userData.push(data);
        });
        setUsers(userData);
    };

    const deleteUserData = async (doc_id) => {
        if (window.confirm('¿Está seguro de eliminar estos datos?')) {
            try {
                await deleteDoc(doc(db, 'users', doc_id));
                setUsers((prevUsers) => prevUsers.filter((user) => user.doc_id !== doc_id));
            } catch (error) {
                console.error('Error al eliminar los datos del usuario:', error);
            }
        }
    };

    return (
        <div id="home-component">
            <div class="bg-primary mx-1 py-3 rounded-xl">
                <h3 class="text-center font-bold text-xl">Visualización De Datos</h3>
            </div>
            <div>
                <div class="w-1/3 flex justify-end items-center my-5 mx-14">
                    <span className="bg-primary rounded-lg p-3 -space-x-3 hover:bg-blue-400">
                        <Link href="/new">Agregar Datos de Usuario</Link>
                    </span>
                </div>
                <div class="mb-4 mx-5">
                    <table class=" divide-y divide-secondary-200 mx-auto">
                        <thead class="bg-slate-300">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Porcentaje
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Votado
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Eliminar Datos
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-primary/80 divide-y divide-secondary-200">
                            {users.map((user) => (
                                <tr key={user.doc_id}>
                                    <td className="px-6 py-2 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-2 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-2 whitespace-nowrap">{user.percentage}</td>
                                    <td className="px-6 py-2 whitespace-nowrap">{user.voted}</td>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                        <button
                                            onClick={() => deleteUserData(user.doc_id)}
                                            className="bg-secondary-200 rounded-lg p-3 m-2 hover:bg-blue-400"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    );
}