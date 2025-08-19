'use client';

import { FiHome, FiUsers, FiBook, FiSettings, FiBarChart2, FiCalendar, FiMail, FiLogOut } from 'react-icons/fi';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const stats = [
    { title: 'Total Siswa', value: '1,245', change: '+12%', trend: 'up' },
    { title: 'Total Pengajar', value: '48', change: '+5%', trend: 'up' },
    { title: 'Kelas Aktif', value: '32', change: '-2%', trend: 'down' },
    { title: 'Pendapatan', value: 'Rp28,5jt', change: '+18%', trend: 'up' },
  ];

  const recentActivities = [
    { id: 1, user: 'Andi Wijaya', action: 'mendaftar kelas baru', time: '10 menit lalu' },
    { id: 2, user: 'Budi Santoso', action: 'menyelesaikan pembayaran', time: '1 jam lalu' },
    { id: 3, user: 'Siti Rahayu', action: 'mengupload tugas', time: '3 jam lalu' },
    { id: 4, user: 'Dewi Kurnia', action: 'mengajukan pertanyaan', time: '5 jam lalu' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Rapat Bulanan', date: '15 Jun 2023', time: '10:00 WIB' },
    { id: 2, title: 'Pelatihan Guru', date: '18 Jun 2023', time: '13:00 WIB' },
    { id: 3, title: 'Ujian Mid Semester', date: '22 Jun 2023', time: '08:00 WIB' },
  ];


  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        credentials: 'include', // penting supaya cookie ikut terhapus
      });

      const data = await res.json();
      if (res.ok) {
        // redirect ke halaman login
        window.location.href = '/login';
      } else {
        alert(data.message || 'Gagal logout');
      }
    } catch (error) {
      console.error('Error logout:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
          <h1 className="text-xl font-bold text-white">Einstein Bimbel</h1>
        </div>
        <div className="p-4">
          <div className="flex items-center p-3 space-x-3 bg-indigo-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
            <div>
              <p className="font-medium">Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
        <nav className="mt-2">
          <Link
            href="#"
            className={`flex items-center px-4 py-3 ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome className="mr-3" />
            Dashboard
          </Link>
          <Link
            href="#"
            className={`flex items-center px-4 py-3 ${activeTab === 'students' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('students')}
          >
            <FiUsers className="mr-3" />
            Manajemen Siswa
          </Link>
          <Link
            href="#"
            className={`flex items-center px-4 py-3 ${activeTab === 'teachers' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('teachers')}
          >
            <FiBook className="mr-3" />
            Manajemen Pengajar
          </Link>
          <Link
            href="#"
            className={`flex items-center px-4 py-3 ${activeTab === 'classes' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('classes')}
          >
            <FiBarChart2 className="mr-3" />
            Manajemen Kelas
          </Link>
          <Link
            href="#"
            className={`flex items-center px-4 py-3 ${activeTab === 'reports' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FiBarChart2 className="mr-3" />
            Laporan
          </Link>
          <Link
            href="#"
            className={`flex items-center px-4 py-3 ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings className="mr-3" />
            Pengaturan
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiLogOut className="mr-3" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard Admin</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <FiMail className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <p className="mb-6 text-gray-600">Halo Admin, ini halaman khusus untuk mengelola sistem.</p>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent activities */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terkini</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        {activity.user.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Lihat semua aktivitas →
              </button>
            </div>

            {/* Upcoming events */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Acara Mendatang</h2>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <FiCalendar className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Lihat kalender →
              </button>
            </div>
          </div>

          {/* Recent students */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Siswa Terbaru</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Lihat semua →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Aksi</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">A</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Andi Wijaya</div>
                          <div className="text-sm text-gray-500">andi@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Matematika Kelas 10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 Jun 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Detail</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">B</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Budi Santoso</div>
                          <div className="text-sm text-gray-500">budi@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fisika Kelas 11</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Jun 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Detail</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">S</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Siti Rahayu</div>
                          <div className="text-sm text-gray-500">siti@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kimia Kelas 12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 Jun 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Detail</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}