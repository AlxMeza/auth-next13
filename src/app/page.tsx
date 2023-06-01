'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard () {
    const [ data, setData ] = useState <{[key: string]: ( string | number)}[]>([])
    const router = useRouter()

    useEffect(() => {
        fetch('/api/clientes')
            .then(res => res.json())
            .then(result => {
                result.message === 'success' ? setData(result.data) : alert('Data not found')
            })
    }, [])

    return(
        <>  
            <nav className="grid bg-gray-900 py-4 px-10 mb-10">
                <button className="place-self-end bg-indigo-500 py-1 px-5 border border-indigo-500 rounded-lg hover:bg-indigo-600" onClick={() => {
                    fetch('/api/logout', { method: 'POST'} )
                        .then(res => res.json())
                        .then(result => router.push('/login'))
                }}>Logout</button>
            </nav>
            <div>
                <h1 className="mx-auto text-center font-semibold text-4xl">Clientes</h1>
                { data.length > 0 && <div className="border rounded-md mx-10 mt-20 p-10 shadow-lg shadow-indigo-300/50"><table className="w-full text-justify" cellSpacing='1rem'>
                    <thead>
                        <tr>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Nombre</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Apellido Paterno</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Apellido Materno</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Email</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Cuenta</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Clabe</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Numero de tarjeta</th>
                            <th className="py-2 px-2 bg-indigo-500 border border-indigo-100">Tipo de cuenta</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map(el => <tr key={el.id}>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.nombre}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.apellido_paterno}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.apellido_materno}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.email}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.numero_cuenta}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.clabe}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.numero_tarjeta}</td>
                            <td className="py-2 px-2 bg-blue-950 border border-indigo-100">{el.tipo_cuenta}</td>
                        </tr>)}
                    </tbody>
                </table></div> }
            </div>
        </>
    )
}