import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableInstansi from "@/components/Tables/TableInstansi";

export const metadata: Metadata = {
  title: "Tabel Instansi",
  description:
    "Sistem Kerjasama PNP",
  };

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel Instansi" />

      <div className="flex flex-col gap-10">
        <TableInstansi />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
