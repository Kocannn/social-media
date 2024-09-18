import prisma from "@/libs/prisma";

export async function POST(request){
  const {content, userId, image} = await request.json()
  const data = {content, image, userId};

  const newPost = await prisma.post.create({data})
  
  if(!newPost)return Response.json({status: 500, message: 'failed to post', isCreated: false})
  else return Response.json({status: 200, message: 'success', isCreated: true})
}