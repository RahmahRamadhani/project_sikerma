import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "SIKERMA",
  description:
    "Sistem Kerjasama PNP",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className="flex flex-col gap-10">
      <div className="grid grid-cols-3 rounded-sm bg-gray-200 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
              Nama
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
              Password
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
              Role
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium text-black dark:text-white xsm:text-base">
              Aksi
            </h5>
          </div>
        </div>
      </div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
