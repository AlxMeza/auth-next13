import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')

  if( token === undefined ){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try{
    const { payload } = await jwtVerify(token.value, new TextEncoder().encode(`${process.env.SECRET_KEY}`))
    return NextResponse.next()
  }catch(error){
    return NextResponse.redirect(new URL('/login', request.url))
  }

}
   
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/api/clientes',
  ],
}