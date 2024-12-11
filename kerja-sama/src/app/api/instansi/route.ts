import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type InstansiType = {
  nama_instansi: string;
  bidang_usaha: string;
  provinsi: string;
  kota: string;
  alamat: string;
  website: string;
  telepon?: string;
  email: string;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const namaInstansi = url.searchParams.get("nama");

    const instansiList = namaInstansi
      ? await prisma.instansi.findMany({
          where: { nama_instansi: { contains: namaInstansi, mode: "insensitive" } },
        })
      : await prisma.instansi.findMany();

    return Response.json({
      statusCode: 200,
      msg: "Data berhasil diambil",
      data: instansiList,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ statusCode: 500, msg: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: InstansiType = await req.json();

    if (!body.nama_instansi || !body.bidang_usaha || !body.email) {
      return Response.json(
        { statusCode: 400, msg: "Field nama_instansi, bidang_usaha, dan email wajib diisi" },
        { status: 400 }
      );
    }

    const existingInstansi = await prisma.instansi.findUnique({ where: { email: body.email } });
    if (existingInstansi) {
      return Response.json({ statusCode: 400, msg: "Email sudah digunakan" }, { status: 400 });
    }

    const newInstansi = await prisma.instansi.create({ data: body });

    return Response.json({ statusCode: 200, msg: "Berhasil menambahkan instansi", data: newInstansi });
  } catch (error) {
    console.error("Error creating data:", error);
    return Response.json({ statusCode: 500, msg: "Gagal menambahkan instansi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return Response.json({ statusCode: 400, msg: "ID tidak diberikan" }, { status: 400 });
    }

    const body: Partial<InstansiType> = await req.json();
    if (Object.keys(body).length === 0) {
      return Response.json({ statusCode: 400, msg: "Tidak ada data untuk diperbarui" }, { status: 400 });
    }

    const existingInstansi = await prisma.instansi.findUnique({ where: { id: Number(id) } });
    if (!existingInstansi) {
      return Response.json({ statusCode: 404, msg: "Data instansi tidak ditemukan" }, { status: 404 });
    }

    if (body.email) {
      const emailCheck = await prisma.instansi.findUnique({ where: { email: body.email } });
      if (emailCheck && emailCheck.id !== Number(id)) {
        return Response.json({ statusCode: 400, msg: "Email sudah digunakan oleh instansi lain" }, { status: 400 });
      }
    }

    const updatedInstansi = await prisma.instansi.update({ where: { id: Number(id) }, data: body });

    return Response.json({ statusCode: 200, msg: "Berhasil memperbarui instansi", data: updatedInstansi });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return Response.json({ statusCode: 404, msg: "Data tidak ditemukan" }, { status: 404 });
    }
    console.error("Error updating Instansi:", error);
    return Response.json({ statusCode: 500, msg: "Gagal memperbarui instansi" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return Response.json({ statusCode: 400, msg: "ID tidak diberikan" }, { status: 400 });
    }

    const existingInstansi = await prisma.instansi.findUnique({ where: { id: Number(id) } });
    if (!existingInstansi) {
      return Response.json({ statusCode: 404, msg: "Data instansi tidak ditemukan" }, { status: 404 });
    }

    const deletedInstansi = await prisma.instansi.delete({ where: { id: Number(id) } });

    return Response.json({ statusCode: 200, msg: "Berhasil menghapus instansi", data: deletedInstansi });
  } catch (error) {
    console.error("Error deleting data:", error);
    return Response.json({ statusCode: 500, msg: "Gagal menghapus instansi" }, { status: 500 });
  }
}
