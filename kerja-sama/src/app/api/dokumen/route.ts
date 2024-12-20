import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type untuk data DokumenKerjasama
type DokumenKerjasamaType = {
  id_kerjasama: number;
  nama_dokumen: string;
  path_file: string;
  tanggal_upload: Date;
  keterangan: string;
};

// --------------------------- MENAMPILKAN DATA ---------------------------
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id_kerjasama = url.searchParams.get('id_kerjasama');

    const dokumenList = await prisma.dokumenKerjasama.findMany({
      where: id_kerjasama ? { id_kerjasama: Number(id_kerjasama) } : undefined,
      include: {
        kerjasama: true, // Join dengan tabel kerjasama
      },
    });

    return Response.json({
      statusCode: 200,
      msg: 'Data berhasil diambil',
      data: dokumenList,
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
    const body: DokumenKerjasamaType = await req.json();

    const newDokumen = await prisma.dokumenKerjasama.create({
      data: {
        id_kerjasama: body.id_kerjasama,
        nama_dokumen: body.nama_dokumen,
        path_file: body.path_file,
        keterangan: body.keterangan,
      },
    });

    return Response.json({
      statusCode: 200,
      msg: 'Berhasil menambahkan dokumen kerjasama',
      data: newDokumen,
    });
  } catch (error) {
    console.error('Error creating data:', error);
    return Response.json(
      {
        statusCode: 500,
        msg: 'Gagal menambahkan dokumen kerjasama',
      },
      { status: 500 }
    );
  }
}

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
  
      const body: Partial<DokumenKerjasamaType> = await req.json();
  
      if (Object.keys(body).length === 0) {
        return Response.json(
          {
            statusCode: 400,
            msg: "Tidak ada data untuk diperbarui",
          },
          { status: 400 }
        );
      }
  
      const updatedDokumen = await prisma.dokumenKerjasama.update({
        where: { id: Number(id) },
        data: {
          ...body,
        },
      });
  
      return Response.json({
        statusCode: 200,
        msg: "Berhasil memperbarui dokumen kerjasama",
        data: updatedDokumen,
      });
    } catch (error) {
      console.error("Error updating DokumenKerjasama:", error);
      return Response.json(
        {
          statusCode: 500,
          msg: "Gagal memperbarui dokumen kerjasama",
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

    // Hapus data dokumen berdasarkan ID
    const deletedDokumen = await prisma.dokumenKerjasama.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json({
      statusCode: 200,
      msg: 'Berhasil menghapus dokumen kerjasama',
      data: deletedDokumen,
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    return Response.json(
      {
        statusCode: 500,
        msg: 'Gagal menghapus dokumen kerjasama',
      },
      { status: 500 }
    );
  }
}
