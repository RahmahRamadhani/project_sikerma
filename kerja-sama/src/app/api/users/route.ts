import { PrismaClient,roleUser } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

// Type untuk User
type UserType = {
  nama_user: string;
  email: string;
  password: string;
  role: string;
};

// --------------------------- MENAMPILKAN DATA ---------------------------
// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return Response.json({
//       statusCode: 200,
//       msg: "Data berhasil diambil",
//       data: users,
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return Response.json(
//       {
//         statusCode: 500,
//         msg: "Gagal mengambil data",
//       },
//       { status: 500 }
//     );
//   }
// }
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";

    const users = await prisma.user.findMany({
      where: {
        nama_user: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    if (users.length === 0 && search) {
      return Response.json({
        statusCode: 404,
        msg: "Data tidak ditemukan. Menampilkan semua data.",
        data: await prisma.user.findMany(),
      });
    }

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






import validator from 'validator';

// --------------------------- MENAMBAHKAN DATA ---------------------------
export async function POST(req: Request) {
  try {
    const body: UserType = await req.json();

    // Validasi email
    if (!validator.isEmail(body.email)) {
      return Response.json(
        {
          statusCode: 400,
          msg: "Format email tidak valid",
        },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return Response.json(
        {
          statusCode: 400,
          msg: "Email sudah terdaftar",
        },
        { status: 400 }
      );
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        nama_user: body.nama_user,
        email: body.email,
        password: hashedPassword,
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

    // Jika password diubah, enkripsi password baru
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

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
