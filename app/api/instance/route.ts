import { Instance, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(request: Request) {

    const data: any = await request.json();

    try {
        const savedInstance: Instance = await prisma.instance.create({
            data: {
                income: data.income,
                amount: parseInt(String(data.amount)),
                categoryId: data.category.id,
                description: data.description
            }
        });

    return Response.json(savedInstance);
    } catch (error) {
        console.error("Failed to create instance: ", error);
        return Response.json("Internal server error: ", error)
    }
}