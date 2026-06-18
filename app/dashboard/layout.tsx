import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Building2 } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch from Prisma to get User Role
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  // If user signed up via Auth but isn't in DB yet (first login)
  if (!dbUser) {
    const condo = await prisma.condominium.create({
      data: { name: 'Condomínio Morazze Modelo' }
    });

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.email!.split('@')[0], 
        role: 'SINDICO', 
        condominiumId: condo.id
      }
    });
  } else if (!dbUser.condominiumId && dbUser.role === 'SINDICO') {
     const condo = await prisma.condominium.create({
      data: { name: 'Condomínio Morazze Modelo' }
     });
     dbUser = await prisma.user.update({
       where: { id: user.id },
       data: { condominiumId: condo.id }
     })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50/50 md:flex-row">
      <Sidebar role={dbUser.role} />
      
      {/* Mobile Top Header */}
      <div className="flex h-16 items-center border-b bg-white px-4 md:hidden">
        <div className="flex items-center space-x-2 bg-[#2563EB]/10 px-3 py-1.5 rounded-full text-[#2563EB]">
            <Building2 className="w-5 h-5" />
            <span className="font-bold tracking-wide">Morazze</span>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
