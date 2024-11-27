import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableUser from "@/components/Tables/TableUser";

export const metadata: Metadata = {
  title: "SIKERMA",
  description:
    "Sistem Kerjasama PNP",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />

      <div className="flex flex-col gap-10">
        <TableUser />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
