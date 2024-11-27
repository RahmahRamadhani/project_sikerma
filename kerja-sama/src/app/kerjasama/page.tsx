import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableKerjasama from "@/components/Tables/TableKerjasama";

export const metadata: Metadata = {
  title: "Tabel Kerjasama",
  description:
    "Sistem Kerjasama PNP",
  };

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel Kerjasama" />

      <div className="flex flex-col gap-10">
        <TableKerjasama />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
