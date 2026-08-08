import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers() 
    })

    //console.log('Session from proxy:', session); // Log the session object for debugging

    if(!session){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/my-bookings', '/add-facility', '/facilities/:path', '/manage-my-facilities'],
}