
import React, { useState, useEffect } from "react";

export default function DashboardLayout() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // MOBILE SIDEBAR STATE

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">

      {/* ---------------- MOBILE MENU BUTTON ---------------- */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* ---------------------- SIDEBAR ---------------------- */}
      {/* Desktop: always visible. Mobile: slide-in */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-40
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* CLOSE BUTTON (Mobile Only) */}
        <button
          className="lg:hidden absolute top-4 right-4 text-xl"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <div className="text-2xl font-bold flex items-center gap-2 mb-8 mt-6">
          <span className="text-purple-600">VIVID</span>
          <span>CUSTOMS</span>
        </div>

        <h3 className="text-xs text-gray-400 mb-2">GENERAL</h3>
        <ul className="space-y-2">
          <li className="p-2 rounded-lg bg-blue-100 font-semibold cursor-pointer">
            Dashboard
          </li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            >
              Logout
            </button>
          </li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            Ship Station Orders
          </li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            Department
          </li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            Promo Code
          </li>
        </ul>

        <h3 className="text-xs text-gray-400 mt-6 mb-2">HOME SECTION</h3>
        <ul className="space-y-2 mb-10">
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Categories</li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Top Categories</li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Products</li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Custom Printing</li>
          <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">Embroidery</li>
        </ul>
      </aside>

      {/* ---------------------- MAIN CONTENT ---------------------- */}
      <section className="flex-1 lg:ml-64 p-6 transition-all">

        {/* ---------------------- NAVBAR ---------------------- */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Good afternoon <b>Admin User!</b></span>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* ---------------------- CARDS ---------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {loading ? (
            <>
              {[1,2,3,4].map((i)=>(
                <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-xl"></div>
              ))}
            </>
          ) : (
            <>
              <Card title="Orders" value="152" color="bg-blue-100" />
              <Card title="Revenue" value="$2,100" color="bg-orange-100" />
              <Card title="Customers" value="28,441" color="bg-green-100" />
              <Card title="Comments" value="152 Unread" color="bg-purple-100" />
            </>
          )}
        </div>

        {/* ---------------------- MID SECTION ---------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Sales */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-4">
            {loading ? (
              <SkeletonTable />
            ) : (
              <>
                <h2 className="font-bold text-lg mb-4">Recent Sales</h2>
                <table className="w-full text-left">
                  <thead className="text-gray-400 text-sm">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Bamboo Watch", price: "$65", img: "🟤" },
                      { name: "Black Watch", price: "$72", img: "⚫" },
                      { name: "Blue Band", price: "$79", img: "🔵" },
                    ].map((item, i) => (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="p-2">{item.img}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.price}</td>
                        <td className="p-2 text-blue-500 cursor-pointer">🔍</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {/* Sales Overview */}
          <div className="bg-white shadow-lg rounded-xl p-4">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>
            ) : (
              <>
                <h2 className="font-bold text-lg mb-4">Sales Overview</h2>
                <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  📈 Chart Placeholder
                </div>
              </>
            )}
          </div>

        </div>

      </section>
    </div>
  );
}

/* ---------------------- CARD ---------------------- */
function Card({ title, value, color }) {
  return (
    <div className="p-5 rounded-xl shadow bg-white hover:scale-[1.02] transition cursor-pointer">
      <div className={`${color} w-10 h-10 rounded-lg mb-2`}></div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

/* ---------------------- SKELETON TABLE ---------------------- */
function SkeletonTable() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 w-1/3 rounded mb-4"></div>
      {[1,2,3].map((i)=>(
        <div key={i} className="flex gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
