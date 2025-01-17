import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type untuk data Kerjasama
type KerjasamaType = {
  nomor_kerjasama: string;
  judul_kerjasama: string;
  topik_kerjasama: string;
  tanggal_mulai: Date;
  tanggal_akhir: Date;
  status: string;
  id_tipe: number;
  id_instansi: number;
};

// --------------------------- MENAMPILKAN DATA ---------------------------
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    // Jika ada `id`, filter data; jika tidak, ambil semua data
    const kerjasamaList = id
      ? await prisma.kerjasama.findUnique({
        where: { id: Number(id) },
        include: {
          tipe: true,
          instansi: true,
          dokumen: true,
        },
      })
      : await prisma.kerjasama.findMany({
        include: {
          tipe: true,
          instansi: true,
          dokumen: true,
        },
      });

    // Format tanggal_akhir sebelum dikembalikan
    const formattedKerjasamaList = Array.isArray(kerjasamaList)
      ? kerjasamaList.map((kerjasama) => ({
        ...kerjasama,
        tanggal_akhir: kerjasama.tanggal_akhir
          ? new Date(kerjasama.tanggal_akhir).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
          : null,
      }))
      : kerjasamaList
        ? {
          ...kerjasamaList,
          tanggal_akhir: kerjasamaList.tanggal_akhir
            ? new Date(kerjasamaList.tanggal_akhir).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
            : null,
        }
        : null;

    return Response.json({
      statusCode: 200,
      msg: 'Data berhasil diambil',
      data: formattedKerjasamaList,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json(
      {
        statusCode: 500,
        msg: 'Gagal mengambil data',
      },
      { status: 500 }
    );
  }
}


// --------------------------- MENAMBAHKAN DATA ---------------------------
export async function POST(req: Request) {
  try {
    const body: KerjasamaType = await req.json();

    const newKerjasama = await prisma.kerjasama.create({
      data: {
        nomor_kerjasama: body.nomor_kerjasama,
        judul_kerjasama: body.judul_kerjasama,
        topik_kerjasama: body.topik_kerjasama,
        tanggal_mulai: body.tanggal_mulai,
        tanggal_akhir: body.tanggal_akhir,
        status: body.status,
        id_tipe: body.id_tipe,
        id_instansi: body.id_instansi,
      },
    });

    return Response.json({
      statusCode: 200,
      msg: 'Berhasil menambahkan data kerjasama',
      data: newKerjasama,
    });
  } catch (error) {
    console.error('Error creating data:', error);
    return Response.json(
      {
        statusCode: 500,
        msg: 'Gagal menambahkan data kerjasama',
      },
      { status: 500 }
    );
  }
}

// --------------------------- MENGUPDATE DATA ---------------------------
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return Response.json(
        {
          statusCode: 400,
          msg: "ID tidak diberikan",
        },
        { status: 400 }
      );
    }

    const body: Partial<KerjasamaType> = await req.json();
    console.log("ID untuk update:", id);
    console.log("Data yang diterima untuk update:", body);

    const existingKerjasama = await prisma.kerjasama.findUnique({
      where: { id: Number(id) },
    });
    if (!existingKerjasama) {
      return Response.json(
        {
          statusCode: 404,
          msg: "Data kerjasama tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // Validasi input (opsional)
    if (body.tanggal_mulai && isNaN(Date.parse(body.tanggal_mulai.toString()))) {
      return Response.json(
        {
          statusCode: 400,
          msg: "Format tanggal_mulai tidak valid",
        },
        { status: 400 }
      );
    }

    const updatedKerjasama = await prisma.kerjasama.update({
      where: { id: Number(id) },
      data: { ...body },
    });

    console.log("Updated Kerjasama:", updatedKerjasama);

    return Response.json({
      statusCode: 200,
      msg: "Berhasil memperbarui kerjasama",
      data: updatedKerjasama,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return Response.json(
          {
            statusCode: 404,
            msg: "Data kerjasama tidak ditemukan",
          },
          { status: 404 }
        );
      }
    }
    console.error("Error updating Kerjasama:", error);
    return Response.json(
      {
        statusCode: 500,
        msg: "Gagal memperbarui kerjasama",
      },
      { status: 500 }
    );
  }
}



// --------------------------- MENGHAPUS DATA ---------------------------
export async function DELETE(req: Request) {
  try {
    // Mendapatkan ID dari query parameter
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return Response.json(
        {
          statusCode: 400,
          msg: 'ID tidak diberikan',
        },
        { status: 400 }
      );
    }

    // Hapus data kerjasama berdasarkan ID
    const deletedKerjasama = await prisma.kerjasama.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json({
      statusCode: 200,
      msg: 'Berhasil menghapus data kerjasama',
      data: deletedKerjasama,
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    return Response.json(
      {
        statusCode: 500,
        msg: 'Gagal menghapus data kerjasama',
      },
      { status: 500 }
    );
  }
}
