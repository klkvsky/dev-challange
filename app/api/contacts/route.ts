import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = request.body;

    if (!body) {
        return Response.json({ error: "No body provided" }, { status: 400 });
    }

    const bodyJson = await request.json();
    const { photoURL, name, email, phone } = bodyJson;

    const contact = await prisma.contact.create({
        data: {
            photoURL,
            name,
            email,
            phone,
        },
    });

    return Response.json(contact);
}

export async function PATCH(request: NextRequest) {
    const body = request.body;

    if (!body) {
        return Response.json({ error: "No body provided" }, { status: 400 });
    }

    const bodyJson = await request.json();
    const { id, photoURL, name, email, phone, isMuted, isFavorite } = bodyJson;

    const contact = await prisma.contact.update({
        where: {
            id: id,
        },
        data: {
            photoURL,
            name,
            email,
            phone,
            isMuted,
            isFavorite,
        },
    });

    return Response.json(contact);
}


export async function DELETE(request: NextRequest) {
    const body = request.body;

    if (!body) {
        return Response.json({ error: "No body provided" }, { status: 400 });
    }

    const bodyJson = await request.json();
    const { id } = bodyJson;

    const contact = await prisma.contact.delete({
        where: {
            id: id,
        },
    });

    return Response.json(contact);
}