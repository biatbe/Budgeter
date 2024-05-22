import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(){
    const categories = await prisma.category.findMany();
    return Response.json(categories);
}

export async function POST(request: Request, category : any) {
    const savedCategory = await prisma.category.create({
        data: {
            name: category.name
        }
    });

    return Response.json(savedCategory);
}