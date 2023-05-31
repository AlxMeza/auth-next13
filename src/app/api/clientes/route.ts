import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { pool } from "@/services/db"

export async function GET(request: Request){
    const cookieStore = cookies()
    const myToken = cookieStore.get('auth')
    if(myToken !== undefined){
        try{
            const validate = verify(myToken.value, `${process.env.SECRET_KEY}`) 
            const [rows] = await pool.query('SELECT * from clientes')
            if(rows) return NextResponse.json({message: 'success', data: rows}, {status: 200})
            return NextResponse.json({message: 'data not found'}, {status: 404})
        }catch (error){
            return NextResponse.json({message: 'invalid token'}, {status: 401})
        }
    }
    return NextResponse.json({message: 'You dont have permission to read this data'}, {status: 401})
}