import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  Star,
  Layers,
  Wrench,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Inquiries', path: '/admin/enquiries', icon: Inbox },
    { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { label: 'Review Moderation', path: '/admin/reviews', icon: Star },
    { label: 'Products', path: '/admin/products', icon: Layers },
    { label: 'Services', path: '/admin/services', icon: Wrench },
    { label: 'Project Gallery', path: '/admin/projects', icon: ImageIcon },
    { label: 'Company Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-arch-ivory text-arch-graphite flex">
      {/* Desktop Sidebar (Deep Obsidian / Graphite) */}
      <aside className="hidden lg:flex flex-col w-64 bg-arch-black text-white border-r border-arch-steel/50 shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-arch-steel/40 flex items-center justify-between">
          <Logo variant="light" showTagline={false} />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-mono tracking-ultra-wide text-arch-champagne/80 uppercase font-semibold">
            CONTROL PORTAL
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-arch-graphite text-arch-champagne border-l-2 border-arch-champagne font-bold'
                    : 'text-arch-sand/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 text-arch-champagne" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-arch-steel/40 space-y-3 bg-arch-graphite/40">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-sm bg-arch-steel/40 border border-arch-steel flex items-center justify-center text-arch-champagne">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate font-heading">{admin?.username || 'Administrator'}</div>
              <div className="text-[9.5px] font-mono text-arch-champagne uppercase tracking-wider">{admin?.role || 'SUPER_ADMIN'}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-arch-steel/40 flex items-center justify-between text-xs font-mono">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-arch-sand/70 hover:text-white text-[11px]"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-arch-black border-b border-arch-steel/50 px-4 py-3 flex items-center justify-between text-white">
        <Logo variant="light" showTagline={false} />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-sm bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-arch-black text-white transform transition-transform duration-300 flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="p-5 border-b border-arch-steel/40 flex items-center justify-between">
            <Logo variant="light" showTagline={false} />
            <button onClick={() => setSidebarOpen(false)} className="text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider ${
                    isActive
                      ? 'bg-arch-graphite text-arch-champagne font-bold'
                      : 'text-arch-sand hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-arch-champagne" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-arch-steel/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-sm bg-rose-500/20 text-rose-300 text-xs font-mono uppercase"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-16 lg:pt-0">
        <div className="p-6 sm:p-10 lg:p-12 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
