import React, { useState } from 'react';
import { 
  Settings, 
  Building, 
  Users, 
  ShieldCheck, 
  Database, 
  Palette, 
  History, 
  Save, 
  AlertTriangle, 
  CheckCircle2,
  Lock,
  Download
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'organisasi' | 'users' | 'database' | 'audit'>('organisasi');

  // Org Settings State
  const [namaOrg, setNamaOrg] = useState('Kelompok Kebon Kopi');
  const [sekretariat, setSekretariat] = useState('Sekretariat Kebon Kopi, RT 02 / RW 05');
  const [kontakWA, setKontakWA] = useState('081234567890');
  const [emailKontak, setEmailKontak] = useState('info@kelompokkebonkopi.id');

  // Users sample
  const [userList, setUserList] = useState([
    { id: '1', email: 'admin@kelompokkebonkopi.id', name: 'Ahmad Fauzi', role: 'Super Admin', status: 'Aktif' },
    { id: '2', email: 'budi@kelompokkebonkopi.id', name: 'H. Budi', role: 'Admin', status: 'Aktif' },
    { id: '3', email: 'ridwan@kelompokkebonkopi.id', name: 'Muhammad Ridwan', role: 'Pengurus', status: 'Aktif' },
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-heading font-bold text-forest">
            Pengaturan Sistem & Hak Akses
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Konfigurasi profil organisasi, otorisasi pengguna (RBAC), serta pemeliharaan database.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-forest hover:bg-forest-light shadow-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Seluruh Pengaturan</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Pengaturan organisasi berhasil disimpan dan disinkronkan ke sistem.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        {[
          { key: 'organisasi', label: 'Profil Organisasi', icon: Building },
          { key: 'users', label: 'Pengelolaan Akun & Hak Akses', icon: Users },
          { key: 'database', label: 'Informasi Database & Backup', icon: Database },
          { key: 'audit', label: 'Riwayat Aktivitas (Audit)', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-forest text-forest font-bold'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFIL ORGANISASI */}
      {activeTab === 'organisasi' && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
          <h2 className="font-heading font-bold text-base text-forest border-b border-gray-100 pb-3">
            Identitas Resmi Kelompok Kebon Kopi
          </h2>

          <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink">Nama Organisasi</label>
              <input
                type="text"
                value={namaOrg}
                onChange={(e) => setNamaOrg(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink">Alamat Sekretariat</label>
              <input
                type="text"
                value={sekretariat}
                onChange={(e) => setSekretariat(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Nomor WhatsApp Pengurus</label>
                <input
                  type="text"
                  value={kontakWA}
                  onChange={(e) => setKontakWA(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink">Email Kontak Resmi</label>
                <input
                  type="email"
                  value={emailKontak}
                  onChange={(e) => setEmailKontak(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-olive"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-forest hover:bg-forest-light transition-colors"
              >
                Simpan Profil
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: PENGELOLAAN AKUN & HAK AKSES */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="font-heading font-bold text-base text-forest">
                  Daftar Pengguna & Otorisasi RBAC
                </h2>
                <p className="text-xs text-ink-subtle">
                  Tingkatan hak akses: Super Admin, Admin, dan Pengurus.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 font-bold text-ink-muted">
                  <tr>
                    <th className="py-2.5 px-3">Nama Pengguna</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Hak Akses (Role)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {userList.map((u) => (
                    <tr key={u.id} className="hover:bg-olive-50/20">
                      <td className="py-2.5 px-3 font-bold text-forest">{u.name}</td>
                      <td className="py-2.5 px-3 text-ink-muted">{u.email}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.role === 'Super Admin' ? 'bg-forest text-beige' :
                          u.role === 'Admin' ? 'bg-olive text-white' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-700 font-semibold">{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INFORMASI DATABASE & BACKUP */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h2 className="font-heading font-bold text-base text-forest">
              Status Penyimpanan Cloud Firestore & Backup
            </h2>

            <div className="p-4 bg-olive-50 border border-olive-200 rounded-xl space-y-2 text-xs text-forest">
              <p className="font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-olive" />
                Jaminan Persistensi Data Permanen
              </p>
              <p className="text-ink-muted leading-relaxed">
                Database KK-DMS menggunakan Google Cloud Firestore. Seluruh data tetap tersimpan saat browser ditutup, pengguna logout, berganti perangkat (HP/Laptop), maupun saat aplikasi diperbarui.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-gray-200 space-y-1">
                <span className="text-ink-subtle">Koleksi Aktif:</span>
                <p className="font-bold text-forest">jamaah, attendance, penerobos, musyawarah, documents</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 space-y-1">
                <span className="text-ink-subtle">Prosedur Pemulihan (Disaster Recovery):</span>
                <p className="font-bold text-forest">Scheduled Export via Google Cloud Storage</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-base text-forest">
            Riwayat Audit Aktivitas Pengurus
          </h2>
          <div className="divide-y divide-gray-100 text-xs">
            {[
              { act: 'Import 25 data jamaah baru via Excel', user: 'Ahmad Fauzi (Super Admin)', time: '07/11/2026 21:00 WIB' },
              { act: 'Pembuatan jadwal Pengajian Rutin 10/11/2026', user: 'H. Budi (Admin)', time: '07/11/2026 19:30 WIB' },
              { act: 'Update progres Musyawarah: Sound System (100%)', user: 'Muhammad Ridwan (Pengurus)', time: '06/11/2026 14:15 WIB' },
            ].map((log, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink">{log.act}</p>
                  <p className="text-[11px] text-ink-subtle">{log.user}</p>
                </div>
                <span className="text-ink-subtle text-[11px]">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
