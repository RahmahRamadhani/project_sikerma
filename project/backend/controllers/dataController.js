exports.getData = (req, res) => {
    const data = {
      message: "Data berhasil diambil!",
      // Tambahkan data lainnya sesuai kebutuhan
    };
    res.json(data);
  };
  