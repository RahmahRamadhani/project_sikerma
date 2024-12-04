import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --------------------------- MENAMPILKAN DATA------------------

export async function GET() {
    try {
        const items = await prisma.tipeKerjasama.findMany();
        return Response.json({
            statusCode: 200,
            msg: "success",
            data: items
        });
    } catch (error) {
        return Response.json({
            msg: "internal server error"
        });
    }
};

// --------------------------- END MENAMPILKAN DATA------------------

type tipe = {
    nama_tipe: string
    deskripsi: string
}

export async function POST(req: Request) {
    try {
        const body: tipe = await req.json();

        const newItem = await prisma.tipeKerjasama.create({
            data: {
                nama_tipe: body.nama_tipe,
                deskripsi: body.deskripsi
            }
        });

        return Response.json ({
            statusCode: 200,
            msg: "Berhasil create Data",
            data: newItem,
        });

    } catch (error) {
        return Response.json ({
            statusCode: 500,
            msg: "Gagal membuat data",
        });
    }
}


