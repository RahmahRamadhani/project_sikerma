import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DataUser from "./DataUser";
import AddUser from "./tambah";

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
        <div className="flex justify-between">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative mb-3 block text-sm font-medium text-black dark:text-white">

              <input
                type="text"
                placeholder="Type to search..."
                className="rounded-md max-w-full border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
              />
            </div>
          </form>
          <AddUser />
        </div>
        <DataUser />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
