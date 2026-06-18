'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Home as HomeIcon, CreditCard, Bell, LogOut, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSignOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Painel', href: '/dashboard', icon: LayoutDashboard, roles: ['SUPERADMIN', 'SINDICO', 'CONDOMINO'] },
    { name: 'Unidades', href: '/dashboard/unidades', icon: HomeIcon, roles: ['SUPERADMIN', 'SINDICO'] },
    { name: 'Cobranças', href: '/dashboard/cobrancas', icon: CreditCard, roles: ['SUPERADMIN', 'SINDICO'] },
    { name: 'Minhas Faturas', href: '/dashboard/faturas', icon: CreditCard, roles: ['CONDOMINO'] },
    { name: 'Comunicados', href: '/dashboard/comunicados', icon: Bell, roles: ['SUPERADMIN', 'SINDICO', 'CONDOMINO'] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="hidden border-r border-slate-200 bg-white md:flex md:w-72 md:flex-col justify-between">
      <div className="p-6">
        <div className="flex items-center space-x-2 bg-[#2563EB]/10 px-4 py-2 rounded-2xl text-[#2563EB] w-max mb-10">
            <Building2 className="w-6 h-6" />
            <span className="font-extrabold text-lg tracking-wide">Morazze</span>
        </div>

        <nav className="space-y-1">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300',
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-4 h-5 w-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6">
         <button
            onClick={handleSignOut}
            className="group flex w-full items-center px-4 py-3 text-sm font-semibold rounded-2xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="mr-4 h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            Sair da Conta
          </button>
      </div>
    </div>
  );
}
