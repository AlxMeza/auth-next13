import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'

export async function POST(req: Request) {
    const myToken = cookies().get('auth')
    if( myToken !== undefined ){
        try{
            verify(myToken.value, `${process.env.SECRET_KEY}`)
            const serialized = serialize('auth', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: new Date('2016-10-05'),
                maxAge: 0,
                path: '/'
            })
            cookies().set('auth', serialized)
            return NextResponse.json({message: 'logout successfull'}, { status: 200})
        } catch(error) {
            return NextResponse.json({message: 'invalid token'}, { status: 401})
        }
    }
    return NextResponse.json({error: 'No token'}, {status: 401})
}