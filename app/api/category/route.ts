import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(){
    try {
        const categories = await prisma.category.findMany();
        return Response.json(categories);
    } catch (error) {
        console.error("Failed to get categories: ", error);
        return Response.json("Internal server error: ", error)
    }
}

export async function POST(request: Request, category : any) {
    try {
        const savedCategory = await prisma.category.create({
            data: {
                name: category.name
            }
        });

        return Response.json(savedCategory);
    } catch (error) {
        console.error("Failed to create category: ", error);
        return Response.json("Internal server error: ", error)
    }
}