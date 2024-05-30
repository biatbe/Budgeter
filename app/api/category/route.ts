import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(){
    try {
        const categories: Category[] = await prisma.category.findMany();
        return Response.json(categories);
    } catch (error) {
        console.error("Failed to get categories: ", error);
        return Response.json("Internal server error: ", error)
    }
}

export async function POST(request: Request) {

    const {name} = await request.json();

    try {
        const savedCategory = await prisma.category.create({
            data: {
                name: name,
            }
        });

        return Response.json(savedCategory);
    } catch (error) {
        console.error("Failed to create category: ", error);
        return Response.json("Internal server error: ", error)
    }
}