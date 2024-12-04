import { PrismaClient,roleUser } from "@prisma/client";

const prisma = new PrismaClient();

// Type untuk User
type UserType = {
  nama_user: string;
  email: string;
  password: string;
  role: string;
};

// --------------------------- MENAMPILKAN DATA ---------------------------
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json({
      statusCode: 200,
      msg: "Data berhasil diambil",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      {
        statusCode: 500,
        msg: "Gagal mengambil data",
      },
      { status: 500 }
    );
  }
}

// --------------------------- MENAMBAHKAN DATA ---------------------------
export async function POST(req: Request) {
  try {
    const body: UserType = await req.json();

    const newUser = await prisma.user.create({
      data: {
        nama_user: body.nama_user,
        email: body.email,
        password: body.password, // Harap enkripsi password jika digunakan di aplikasi nyata
        role: body.role as roleUser,
      },
    });

    return Response.json({
      statusCode: 200,
      msg: "Berhasil menambahkan user",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      {
        statusCode: 500,
        msg: "Gagal menambahkan user",
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

    const body: Partial<UserType> = await req.json();

    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          ...body,
          role: body.role as roleUser, // Cast string ke enum
        },
      });

    return Response.json({
      statusCode: 200,
      msg: "Berhasil mengupdate user",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json(
      {
        statusCode: 500,
        msg: "Gagal mengupdate user",
      },
      { status: 500 }
    );
  }
}

// --------------------------- MENGHAPUS DATA ---------------------------
export async function DELETE(req: Request) {
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

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return Response.json({
      statusCode: 200,
      msg: "Berhasil menghapus user",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json(
      {
        statusCode: 500,
        msg: "Gagal menghapus user",
      },
      { status: 500 }
    );
  }
}
