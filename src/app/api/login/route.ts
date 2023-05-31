import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { pool } from '../../../services/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { serialize } from 'cookie'

export async function POST(request: Request) {
    const user:any = await request.json()
    const dataDB:any = await pool.query(`SELECT * FROM users where email = '${user.email}'`)
    const userDB:any = dataDB[0][0]
    if(userDB != undefined){
        const match = bcrypt.compareSync(user.password, userDB.password)
        if(match){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                email: userDB.email,
                name: userDB.name 
            }, `${process.env.SECRET_KEY}`)

            // const serialized = serialize('auth', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            //     maxAge: 1000 * 60 * 60 * 24 * 30,
            //     path: '/'
            // })
            const date = new Date()

            cookies().set({
                name: 'auth',
                value: token,
                httpOnly: true,
                sameSite: 'strict',
                expires: date.setDate(date.getDate() + 30),
                secure: process.env.NODE_ENV === 'production',
                path: '/'
            })
            return NextResponse.json({message: 'success'})
        }
        return NextResponse.json({message: 'email or password incorrect'}, {status: 401})
    } 
    return NextResponse.json({message: 'the email is not registered'}, {status: 404})
}

export async function GET() {
    const res:any = await pool.query('SELECT * FROM clientes where id <= 10')
    return NextResponse.json({message: 'hello', data: res[0]})
}