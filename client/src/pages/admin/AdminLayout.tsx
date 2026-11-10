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
    <div className="min-h-screen bg-ivory-50 text-graphite-800 flex">
      {/* Desktop Sidebar (Deep Ink-900 / Graphite-800) */}
      <aside
        className="hidden lg:flex flex-col w-64 bg-ink-900 text-ivory-100 border-r border-graphite-600/60 shrink-0"
        style={{ backgroundColor: '#0E0E0F' }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-graphite-600/60 flex items-center justify-between">
          <Logo variant="light" showTagline={false} />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-mono tracking-technical text-copper-500 uppercase font-semibold">
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
                    ? 'bg-graphite-800 text-copper-500 border-l-2 border-copper-500 font-bold'
                    : 'text-silver-400 hover:text-ivory-100 hover:bg-graphite-800/40'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 text-copper-500" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-graphite-600/60 space-y-3 bg-graphite-800/50">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-sm bg-ink-900 border border-graphite-600 flex items-center justify-center text-copper-500">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-ivory-100 truncate font-heading">
                {admin?.username || 'Administrator'}
              </div>
              <div className="text-[9.5px] font-mono text-copper-500 uppercase tracking-wider">
                {admin?.role || 'SUPER_ADMIN'}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-graphite-600/60 flex items-center justify-between text-xs font-mono">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-silver-400 hover:text-ivory-100 text-[11px]"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-danger-500 hover:opacity-80 text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-ink-900 border-b border-graphite-600 px-4 py-3 flex items-center justify-between text-ivory-100">
        <Logo variant="light" showTagline={false} />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-sm bg-graphite-800 text-ivory-100"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-ink-900/80"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-ink-900 text-ivory-100 transform transition-transform duration-300 flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="p-5 border-b border-graphite-600 flex items-center justify-between">
            <Logo variant="light" showTagline={false} />
            <button onClick={() => setSidebarOpen(false)} className="text-silver-400">
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
                      ? 'bg-graphite-800 text-copper-500 font-bold'
                      : 'text-silver-400 hover:text-ivory-100 hover:bg-graphite-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4 text-copper-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-graphite-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-sm bg-danger-500/15 text-danger-500 text-xs font-mono uppercase"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-16 lg:pt-0 bg-ivory-50">
        <div className="p-6 sm:p-10 lg:p-12 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
