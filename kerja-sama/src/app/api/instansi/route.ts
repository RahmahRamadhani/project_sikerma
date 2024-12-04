import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type untuk data Instansi
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

// --------------------------- MENAMPILKAN DATA ---------------------------
export async function GET() {
  try {
    const instansiList = await prisma.instansi.findMany();
    return Response.json({
      statusCode: 200,
      msg: 'Data berhasil diambil',
      data: instansiList,
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
    const body: InstansiType = await req.json();

    const newInstansi = await prisma.instansi.create({
      data: {
        nama_instansi: body.nama_instansi,
        bidang_usaha: body.bidang_usaha,
        provinsi: body.provinsi,
        kota: body.kota,
        alamat: body.alamat,
        website: body.website,
        telepon: body.telepon,
        email: body.email,
      },
    });

    return Response.json({
      statusCode: 200,
      msg: 'Berhasil menambahkan instansi',
      data: newInstansi,
    });
  } catch (error) {
    console.error('Error creating data:', error);
    return Response.json(
      {
        statusCode: 500,
        msg: 'Gagal menambahkan instansi',
      },
      { status: 500 }
    );
  }
}

// --------------------------- MENGUPDATE DATA INSTANSI ---------------------------
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
  
      const body: Partial<InstansiType> = await req.json();
  
      if (Object.keys(body).length === 0) {
        return Response.json(
          {
            statusCode: 400,
            msg: "Tidak ada data untuk diperbarui",
          },
          { status: 400 }
        );
      }
  
      const updatedInstansi = await prisma.instansi.update({
        where: { id: Number(id) },
        data: {
          ...body,
        },
      });
  
      return Response.json({
        statusCode: 200,
        msg: "Berhasil memperbarui instansi",
        data: updatedInstansi,
      });
    } catch (error) {
      console.error("Error updating Instansi:", error);
      return Response.json(
        {
          statusCode: 500,
          msg: "Gagal memperbarui instansi",
        },
        { status: 500 }
      );
    }
  }

// menghapus data
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
  
      // Hapus data instansi berdasarkan ID
      const deletedInstansi = await prisma.instansi.delete({
        where: {
          id: Number(id),
        },
      });
  
      return Response.json({
        statusCode: 200,
        msg: 'Berhasil menghapus instansi',
        data: deletedInstansi,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      return Response.json(
        {
          statusCode: 500,
          msg: 'Gagal menghapus instansi',
        },
        { status: 500 }
      );
    }
  }