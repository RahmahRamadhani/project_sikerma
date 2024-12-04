import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Tabel Kerjasama",
  description:
    "Sistem Kerjasama PNP",
  };

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel Kerjasama" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
 
      <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative mb-3 block text-sm font-medium text-black dark:text-white">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className=" rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
              />
            </div>
          </form>
      <div className="flex flex-col gap-10">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Nomor Kerjasama
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Tipe
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Judul
              </th>
              {/* <th className="px-4 py-4 font-medium text-black dark:text-white">
                Topik
              </th> */}
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Instansi
              </th>
              {/* <th className="px-4 py-4 font-medium text-black dark:text-white">
                Tanggal Mulai
              </th> */}
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Tanggal Akhir
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          </table>
          </div>
      </div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
