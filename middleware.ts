import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ]
}

export default async function middleware(req: NextRequest){
    const url = req.nextUrl
    console.log(url)

    //get hostname of request 
    let hostname = req.headers.get("host")!.replace("localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    console.log(hostname)

    const searchParams = req.nextUrl.searchParams.toString();

    //get pathname of request
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

    if(
        hostname === 'localhost:3000' || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ){
        return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, req.url))
    }

    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
}