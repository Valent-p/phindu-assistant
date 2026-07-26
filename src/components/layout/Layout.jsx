import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Home' },
  { path: '/transactions', icon: 'account_balance_wallet', label: 'History' },
  { path: '/products', icon: 'shopping_bag', label: 'Products' },
  { path: '/insights', icon: 'trending_up', label: 'Insights' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <img alt="Phindu Assistance Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDagdFWjsrDySS2bQsL-c5xDVeX-rnN6NfUUIzodyXdXkXmxE-pSD9v9R8pOFmSDQ3t_RUuwGTIYhf9QQcM_UmL7YS1KPQVhVGmttXfxJJuAG_0IkSIqdorqh5IxDyobzKJOMy4v5U9yEWlXMHEXTV0CEeZQPynvAHjZwyvQkeGWxfadtu2Qz-MXVwK4PQR9fs47Au_OMoruRPVbmhoKZXf6OvgNOtPmn8tJllCUrsWq-Wl8xbo4htYIQ-_LCgS-YThDA3EqrD0y_Q" />
            <span className="font-title-lg text-title-lg text-primary">Phindu</span>
          </div>
          <div className="flex items-center gap-md">
            <span className="hidden sm:block font-label-md text-label-md text-on-surface-variant capitalize">
              {location.pathname.substring(1)}
            </span>
            <img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB039kMpdgxwl6x-OM01tS-um73R-akk4lC_vNmv-uu-NFTSzAS5V-UIs34EJEFZbi3OWHzaBqZgc0lrq8nQl11-_7A4w66n81Ju5VTopp36Flv9jimmoVh8-6qZt5u3yC51WhUF1PIqBf5CGWR4A1a89Nd9ysAS9YZ5QxdUeoP3hqBIW2p-CAcwalnXgeLUl8CdvYczGPueW51k0JBK9Q0chGSDZDFNJa6cQrvAPeVyTKn3aOUENdYTTEOblod21K5ggEPsY1bQyQ" />
          </div>
        </div>
      </header>

      <main className="relative w-full pt-16 bg-background">
        <Outlet />
        <div className="h-24"></div>
      </main>

      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/80 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex justify-around items-center h-16 px-xs">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {item.icon}
                </span>
                <span className="font-label-md text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
