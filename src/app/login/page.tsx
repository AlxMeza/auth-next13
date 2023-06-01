'use client'
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from "react-toastify"

export default function Login (){
    const [ status, setStatus ] = useState('show')
    const router = useRouter()

    const handlerSubmit = (e:any) => {
        e.preventDefault()
        let email:any = document.getElementById('email')
        let password:any = document.getElementById('password')
        fetch('/api/login', { 
            method: 'POST', 
            headers: {  "Content-Type": "application/json", },
            body: JSON.stringify({email: email.value, password: password.value}) 
        }).then(res => res.json())
        .then(result => {
            email.value = ''
            password.value = ''
            result.message === 'success' ? router.push('/') : notify(result.message)
        })
    }

    const notify = ( message: string ) => {
        toast(`🦄 | ${message}`, { 
            position: "top-center", 
            autoClose: 5000, 
            hideProgressBar: false, 
            closeOnClick: true,  
            pauseOnHover: true, 
            draggable: true, 
            progress: undefined, theme: "dark" 
        })
    }

    return(
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable
                pauseOnHover theme="dark" />
            <main className="grid md:grid-cols-2 grid-cols-1 gap-4 px-10 py-10 min-h-screen">
                <form onSubmit={handlerSubmit} className="px-10 py-10 md:w-3/4 mx-auto w-full border dark:border-gray-600 rounded-lg border-gray-300 place-self-center">
                    <h2 className="text-center my-10 text-2xl font-semibold">Welcome!</h2>
                    <input type="email" id='email' placeholder="email" className="block w-full mb-5 py-1 px-4 bg-neutral-100 rounded-lg focus:outline-none text-black
                    focus:ring-4 focus:ring-indigo-500" required/>
                    {/* <input type="password" placeholder="password" className="block w-full mb-10 py-1 px-4 bg-neutral-100 rounded-lg focus:outline-none 
                    focus:ring-4 focus:ring-indigo-500" /> */}
                    <div className="mb-10 relative">
                        <input type="password" id='password' placeholder="password" className="pl-4 text-black bg-neutral-100 py-1 rounded-lg focus:outline-none 
                        w-full focus:ring-4 focus:ring-indigo-500" required/>
                        <span className="text-gray-800 absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5"><p 
                        className="focus:outline-none focus:text-indigo-500 focus:underline decoration-indigo-500 border rounded-lg" onClick={(e) => {
                            e.preventDefault()
                            let element:any = document.getElementById('password')
                            status === 'show' ? setStatus('hidden') : setStatus('show')
                            status === 'show' ? element.type = 'text' : element.type = 'password' 
                        }}>{status}</p></span>
                    </div>
                    <button className="border border-indigo-500 py-1 text-lg w-full rounded-lg bg-indigo-500 hover:bg-indigo-600 mb-10 focus:outline-none
                    focus:ring focus:ring-indigo-400">Send</button>
                </form>
                <aside className="px-5 md:w-10/12 mx-auto w-full place-self-center md:block hidden">
                    <Image src='/login.svg' alt='login picture' width={1000} height={1000}/>
                </aside>
            </main>
        </>
    )
}