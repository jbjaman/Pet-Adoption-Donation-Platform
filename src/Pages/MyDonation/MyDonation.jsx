import { FaHandHoldingDollar } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";

const MyDonation = () => {
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-800">
          <FaHandHoldingDollar />
          Donation History
        </span>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          My Donations
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your donation history and manage your contributions.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-slate-50 text-sm font-bold text-teal-800">
              <tr>
                <th className="px-5 py-4">SL No.</th>
                <th className="px-5 py-4">Profile</th>
                <th className="px-5 py-4 text-left">Campaign</th>
                <th className="px-5 py-4">Donation</th>
                <th className="px-5 py-4">Refund</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="transition hover:bg-teal-50/40">
                <th className="px-5 py-5 font-semibold">1</th>

                <td className="px-5 py-5">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 overflow-hidden rounded-xl">
                      <img
                        src="https://i.ibb.co/thg9Wqx/campaign1.png"
                        alt="Sweet Home"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-5 text-left">
                  <p className="font-bold text-slate-900">Sweet Home</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Donation Campaign
                  </p>
                </td>

                <td className="px-5 py-5">
                  <span className="rounded-full bg-teal-50 px-3 py-1.5 font-bold text-teal-700">
                    $100
                  </span>
                </td>

                <td className="px-5 py-5">
                  <button
                    type="button"
                    title="Refund donation"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <RiRefund2Line className="text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>

            <tfoot className="border-t border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">SL No.</th>
                <th className="px-5 py-4">Profile</th>
                <th className="px-5 py-4 text-left">Campaign</th>
                <th className="px-5 py-4">Donation</th>
                <th className="px-5 py-4">Refund</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="space-y-4 md:hidden">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <img
                src="https://i.ibb.co/thg9Wqx/campaign1.png"
                alt="Sweet Home"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
                Donation #1
              </p>

              <h2 className="mt-1 truncate text-lg font-extrabold text-slate-900">
                Sweet Home
              </h2>

              <p className="mt-1 text-sm text-slate-500">Donation Campaign</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Donated
              </p>

              <p className="mt-1 text-lg font-extrabold text-teal-700">$100</p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              <RiRefund2Line className="text-lg" />
              Refund
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyDonation;
