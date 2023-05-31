'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard () {
    const [ data, setData ] = useState<{[key: string]: any}>({})
    const router = useRouter()

    useEffect(() => {
        fetch('/api/clientes')
            .then(res => res.json())
            .then(result => {
                console.log(result.data)
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
            <h1>Dashboard</h1>
        </>
    )
}