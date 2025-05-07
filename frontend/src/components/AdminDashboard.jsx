import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Bell, User, Home, Settings, LogOut, BookOpen, Users,
  UserCog, ClipboardList, Eye, EyeOff, ChevronLeft, Plus, Download,
  Filter, Edit, Mail, MessageSquare, BarChart2, AlertCircle, CheckCircle,
  ChevronDown, ChevronUp, Search, FileText, Printer, Shield, Lock, RotateCw,
  Bookmark, Calendar, Clock, Smartphone, CreditCard, PieChart, ArrowUp, ArrowDown
} from 'lucide-react';

const AdminDashboard = () => {
  // State management
  const [activeView, setActiveView] = useState('dashboard');
  const [passwordVisible, setPasswordVisible] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Dark mode state with proper initialization
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply dark mode class and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Sample data
  const stats = [
    { title: 'TOTAL MURID', value: 60, icon: <Users className="w-5 h-5" />, trend: 'up' },
    { title: 'GURU & STAFF', value: 7, icon: <UserCog className="w-5 h-5" />, trend: 'neutral' },
    { title: 'KELAS AKTIF', value: 5, icon: <BookOpen className="w-5 h-5" />, trend: 'up' },
    { title: 'TUGAS AKTIF', value: 25, icon: <ClipboardList className="w-5 h-5" />, trend: 'down' }
  ];

  const [classes, setClasses] = useState([
    { id: 1, name: 'A1', teacher: 'Bu Ani', students: 15, capacity: 15 },
    { id: 2, name: 'B2', teacher: 'Pak Budi', students: 12, capacity: 15 }
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Ani W.', role: 'Guru Kelas', class: 'A1', status: 'Aktif', username: 'aniw', password: 'password123' }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: 'Dika', role: 'Security', status: 'Aktif', username: 'dika', password: 'secure123' },
    { id: 2, name: 'Budi S.', role: 'IT', status: 'Cuti', username: 'budi', password: 'itadmin' }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Alika P.', age: '5.2', class: 'A1', parent: '0812XXXXXX', username: 'alika', password: 'alika123' },
    { id: 2, name: 'Bima S.', age: '5.5', class: 'B2', parent: '0813XXXXXX', username: 'bima', password: 'bima456' }
  ]);

  const reports = [
    { id: 1, class: 'A', teacher: 'Bu Dian', attendance: 92, payment: 100, performance: { game: 8.2, story: 10 } },
    { id: 2, class: 'B', teacher: 'Pak Rudi', attendance: 88, payment: 85, performance: { game: 7.5, story: 8 } },
    { id: 3, class: 'C', teacher: 'Bu Siti', attendance: 75, payment: 100, performance: { game: 6.8, story: 7 } }
  ];

  const logs = [
    { id: 1, time: '18/10 14:30', user: 'ani@alif.id', action: 'Tambah Murid', target: 'Alika Putri' },
    { id: 2, time: '18/10 15:12', user: 'budi@alif.id', action: 'Hapus Kelas', target: 'Kelas B' }
  ];

  // Helper functions
  const togglePasswordVisibility = (id, type) => {
    setPasswordVisible(prev => ({
      ...prev,
      [`${type}_${id}`]: !prev[`${type}_${id}`]
    }));
  };

  const renderProgressBar = (percentage) => {
    const width = Math.min(100, Math.max(0, percentage));
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
          style={{ width: `${width}%` }}
        />
      </div>
    );
  };

  const showClassDetail = (classId) => {
    setSelectedClass(reports.find(c => c.id === classId));
    setActiveView('classDetail');
  };

  const handleLogout = () => {
    console.log('Logout berhasil');
  };

  const handleAddData = (type) => {
    console.log(`Menambahkan data ${type} baru`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // View Components
  const DashboardView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">DASHBOARD UTAMA</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400' : 
                               stat.trend === 'down' ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400' : 
                               'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'MANAJEMEN KELAS', icon: <BookOpen className="w-5 h-5" />, view: 'kelas' },
          { title: 'MANAJEMEN GURU', icon: <UserCog className="w-5 h-5" />, view: 'guru' },
          { title: 'MANAJEMEN SISWA', icon: <Users className="w-5 h-5" />, view: 'siswa' },
          { title: 'MANAJEMEN STAFF', icon: <ClipboardList className="w-5 h-5" />, view: 'staff' }
        ].map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView(action.view)}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all flex items-center space-x-3"
          >
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-lg">
              {action.icon}
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{action.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Monthly Report */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">LAPORAN BULANAN ADMIN | OKTOBER 2025</h3>
        </div>
        
        <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-300">📈 RINGKASAN KINERJA BULANAN</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { title: 'KEHADIRAN', value: 85, trend: '+12% vs Sep\'25', color: 'bg-emerald-500' },
            { title: 'TUGAS', value: 65, trend: '-5% vs Sep\'25', color: 'bg-amber-500' },
            { title: 'PEMBAYARAN', value: 92, trend: '3 unpaid', color: 'bg-indigo-500' }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-medium text-sm text-gray-700 dark:text-gray-300">{item.title}</p>
              <div className="flex items-center mt-2">
                {renderProgressBar(item.value)}
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{item.value}%</span>
              </div>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{item.trend}</p>
            </div>
          ))}
        </div>

        <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-300">🏫 DETAIL KELAS</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Guru</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kehadiran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Pembayaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{report.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{report.teacher}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderProgressBar(report.attendance)}
                      <span className="ml-2 text-gray-900 dark:text-white">{report.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderProgressBar(report.payment)}
                      <span className="ml-2 text-gray-900 dark:text-white">{report.payment}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => showClassDetail(report.id)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                    >
                      <BarChart2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-300">⚠️ CATATAN PENTING</h4>
        <div className="space-y-2">
          {[
            { text: 'Kelas C: Kehadiran terendah (75%)', icon: <AlertCircle className="w-4 h-4" />, color: 'text-rose-600 dark:text-rose-400' },
            { text: '3 Orang Tua (Kelas B) belum lunasi SPP', icon: <AlertCircle className="w-4 h-4" />, color: 'text-rose-600 dark:text-rose-400' },
            { text: 'Kelas A: Peningkatan 5% partisipasi dongeng', icon: <CheckCircle className="w-4 h-4" />, color: 'text-emerald-600 dark:text-emerald-400' }
          ].map((note, index) => (
            <div key={index} className={`flex items-center ${note.color}`}>
              <span className="mr-2">{note.icon}</span>
              <span>{note.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ClassManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MANAJEMEN KELAS</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Ajaran</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>2024/2025</option>
                <option>2023/2024</option>
              </select>
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenjang</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Semua</option>
                <option>TK A</option>
                <option>TK B</option>
              </select>
              <Bookmark className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Cari kelas..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAddData('kelas')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            TAMBAH KELAS
          </motion.button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Edit className="w-5 h-5" />
            EDIT BATCH
          </button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Download className="w-5 h-5" />
            EXPORT
          </button>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Wali Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Murid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kapasitas</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{cls.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{cls.teacher}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{`${cls.students}/${cls.capacity}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${(cls.students/cls.capacity*100) >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                          style={{ width: `${(cls.students/cls.capacity*100)}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900 dark:text-white">{Math.round(cls.students/cls.capacity*100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TeacherManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MANAJEMEN GURU</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Aktif</option>
                <option>Tidak Aktif</option>
                <option>Cuti</option>
              </select>
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Semua</option>
                <option>A1</option>
                <option>B2</option>
              </select>
              <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Cari guru..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAddData('guru')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            TAMBAH GURU
          </motion.button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Download className="w-5 h-5" />
            EXPORT
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{teacher.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{teacher.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{teacher.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      teacher.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' : 
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                    }`}>
                      {teacher.status === 'Aktif' ? '🟢 Aktif' : '🟡 Cuti'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{teacher.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {passwordVisible[`teacher_${teacher.id}`] ? (
                        <span className="text-gray-900 dark:text-white">{teacher.password}</span>
                      ) : (
                        <span className="text-gray-900 dark:text-white">••••••••</span>
                      )}
                      <button 
                        onClick={() => togglePasswordVisibility(teacher.id, 'teacher')}
                        className="ml-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {passwordVisible[`teacher_${teacher.id}`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-300">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const StaffManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MANAJEMEN STAFF</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Aktif</option>
                <option>Tidak Aktif</option>
                <option>Cuti</option>
              </select>
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Semua</option>
                <option>Security</option>
                <option>IT</option>
                <option>Administrasi</option>
              </select>
              <UserCog className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Cari staff..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAddData('staff')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            TAMBAH STAFF
          </motion.button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Download className="w-5 h-5" />
            EXPORT
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {staff.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{person.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{person.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      person.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' : 
                      person.status === 'Cuti' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' : 
                      'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
                    }`}>
                      {person.status === 'Aktif' ? '🟢 Aktif' : person.status === 'Cuti' ? '🟡 Cuti' : '🔴 Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{person.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {passwordVisible[`staff_${person.id}`] ? (
                        <span className="text-gray-900 dark:text-white">{person.password}</span>
                      ) : (
                        <span className="text-gray-900 dark:text-white">••••••••</span>
                      )}
                      <button 
                        onClick={() => togglePasswordVisibility(person.id, 'staff')}
                        className="ml-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {passwordVisible[`staff_${person.id}`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-300">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const StudentManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MANAJEMEN SISWA</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Semua</option>
                <option>A1</option>
                <option>B2</option>
              </select>
              <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Aktif</option>
                <option>Tidak Aktif</option>
                <option>Alumni</option>
              </select>
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Masuk</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Cari siswa..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAddData('siswa')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            TAMBAH SISWA
          </motion.button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            BUAT LAPORAN
          </button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Download className="w-5 h-5" />
            EXPORT
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Usia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Orang Tua</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{student.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{student.parent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{student.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {passwordVisible[`student_${student.id}`] ? (
                        <span className="text-gray-900 dark:text-white">{student.password}</span>
                      ) : (
                        <span className="text-gray-900 dark:text-white">••••••••</span>
                      )}
                      <button 
                        onClick={() => togglePasswordVisibility(student.id, 'student')}
                        className="ml-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {passwordVisible[`student_${student.id}`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-rose-600 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-300">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AuditLogView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AUDIT SISTEM LOG</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Semua</option>
                <option>ani@alif.id</option>
                <option>budi@alif.id</option>
              </select>
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aksi</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Semua</option>
                <option>Tambah Murid</option>
                <option>Hapus Kelas</option>
              </select>
              <ClipboardList className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentang Waktu</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
                <option>Tahun Ini</option>
                <option>Custom</option>
              </select>
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Cari log..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Download className="w-5 h-5" />
            EXPORT CSV
          </button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <Printer className="w-5 h-5" />
            CETAK
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">WAKTU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">USER</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">AKSI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">TARGET</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{log.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{log.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{log.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ PENGATURAN SISTEM</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">🔐 KEAMANAN</h3>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durasi Login</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>30 menit</option>
                <option>1 jam</option>
                <option>2 jam</option>
                <option>1 hari</option>
              </select>
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kompleksitas Password</label>
            <div className="relative">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Tinggi</option>
                <option>Sedang</option>
                <option>Rendah</option>
              </select>
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="twoFactor" 
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700" 
              defaultChecked 
            />
            <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">2-Factor Auth</label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="darkModeToggle" 
              checked={darkMode}
              onChange={toggleDarkMode}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700" 
            />
            <label htmlFor="darkModeToggle" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Dark Mode</label>
          </div>
        </div>

        {/* Notification Settings */}
        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">📧 NOTIFIKASI</h3>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Admin</label>
            <div className="relative">
              <input 
                type="email" 
                defaultValue="admin@tkalif.id" 
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" 
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp Gateway</label>
            <div className="relative">
              <input 
                type="tel" 
                defaultValue="+62812XXXXXX" 
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white" 
              />
              <Smartphone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>

        {/* System Update */}
        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">🔄 UPDATE SISTEM</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Versi Terkini</label>
            <p className="text-gray-900 dark:text-white">v2.1.0</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Backup</label>
            <p className="text-gray-900 dark:text-white">18/10 23:59</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <RotateCw className="w-5 h-5" />
              CHECK UPDATE
            </button>
            <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
              <Bookmark className="w-5 h-5" />
              BACKUP NOW
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mt-8">
          <button 
            onClick={() => console.log('Pengaturan disimpan')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Bookmark className="w-5 h-5" />
            SIMPAN PERUBAHAN
          </button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <RotateCw className="w-5 h-5" />
            RESET
          </button>
        </div>
      </div>
    </div>
  );

  const ClassDetailView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📊 DETAIL KELAS {selectedClass.class}</h2>
        <button 
          onClick={() => setActiveView('dashboard')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          <ChevronLeft className="mr-1 w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Guru</h3>
            <p className="text-gray-900 dark:text-white">{selectedClass.teacher}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Periode</h3>
            <p className="text-gray-900 dark:text-white">1-31 Oktober 2025</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Jumlah Siswa</h3>
            <p className="text-gray-900 dark:text-white">15</p>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">📊 PERFORMANCE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-300">Game Edukasi</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2 text-gray-900 dark:text-white">{selectedClass.performance.game}/10</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> +1.2 vs Sep
              </span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-300">Dongeng</h4>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2 text-gray-900 dark:text-white">{selectedClass.performance.story}/10</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" /> +5 vs Sep
              </span>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">🛠️ AKSI</h3>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log('Menghubungi orang tua')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Hubungi Orang Tua
          </motion.button>
          <button className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Buat Catatan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex`}>
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">TK Islam Alif</h2>
          </div>
          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            {[
              { name: 'Beranda', icon: <Home className="w-5 h-5" />, view: 'dashboard' },
              { name: 'Manajemen Kelas', icon: <BookOpen className="w-5 h-5" />, view: 'kelas' },
              { name: 'Manajemen Guru', icon: <UserCog className="w-5 h-5" />, view: 'guru' },
              { name: 'Manajemen Siswa', icon: <Users className="w-5 h-5" />, view: 'siswa' },
              { name: 'Manajemen Staff', icon: <ClipboardList className="w-5 h-5" />, view: 'staff' },
              { name: 'Audit Log', icon: <FileText className="w-5 h-5" />, view: 'audit' },
              { name: 'Pengaturan', icon: <Settings className="w-5 h-5" />, view: 'settings' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveView(item.view)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left ${
                  activeView === item.view 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className={activeView === item.view ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400"
            >
              <LogOut className="w-5 h-5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              {isMobile && (
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="mr-4 text-gray-700 dark:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TK Islam Alif
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative text-gray-700 dark:text-gray-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-medium">
                  AD
                </div>
                <span className="font-medium text-gray-900 dark:text-white hidden sm:inline">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && isMobile && (
            <motion.div 
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu Navigasi</h2>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { name: 'Beranda', icon: <Home className="w-5 h-5" />, view: 'dashboard' },
                  { name: 'Manajemen Kelas', icon: <BookOpen className="w-5 h-5" />, view: 'kelas' },
                  { name: 'Manajemen Guru', icon: <UserCog className="w-5 h-5" />, view: 'guru' },
                  { name: 'Manajemen Siswa', icon: <Users className="w-5 h-5" />, view: 'siswa' },
                  { name: 'Manajemen Staff', icon: <ClipboardList className="w-5 h-5" />, view: 'staff' },
                  { name: 'Audit Log', icon: <FileText className="w-5 h-5" />, view: 'audit' },
                  { name: 'Pengaturan', icon: <Settings className="w-5 h-5" />, view: 'settings' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveView(item.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left ${
                      activeView === item.view 
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className={activeView === item.view ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Keluar</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'dashboard' && <DashboardView />}
              {activeView === 'kelas' && <ClassManagementView />}
              {activeView === 'guru' && <TeacherManagementView />}
              {activeView === 'siswa' && <StudentManagementView />}
              {activeView === 'staff' && <StaffManagementView />}
              {activeView === 'audit' && <AuditLogView />}
              {activeView === 'settings' && <SettingsView />}
              {activeView === 'classDetail' && <ClassDetailView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;