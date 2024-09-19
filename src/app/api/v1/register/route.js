import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function POST(request){
  const { name, email, password, image} = await request.json();
  // if(!name || !email || !password) return new NextResponse("Missing some data", {status: 400})
  const exists = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  if(exists) return new NextResponse(JSON.stringify("User already exists"), {status: 409})
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      image: image,
      username: email.split('@')[0]
    }
  })
  if(user) return new NextResponse(JSON.stringify("User created"), {status: 200})
}