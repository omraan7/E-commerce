import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware (req:NextRequest){
  const token =  await getToken({req, secret:process.env.NEXTAUTH_SECRET})

  const pathName=req.nextUrl.pathname
  // console.log(pathName);
  if (pathName==="/Login"|| pathName==="/Register") {
    if (!!token) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`)
      
    }else{
      return NextResponse.next()
    }
    
  }

  
  
  // console.log("heee",token) ;
  
  if (!!token) {
    return NextResponse.next()
    
  }
return NextResponse.redirect(`${process.env.NEXTAUTH_URL}Login`)



}


export const config ={
  matcher:["/cart","/Login","/Register"]
}

//qixanu@mailinator.com