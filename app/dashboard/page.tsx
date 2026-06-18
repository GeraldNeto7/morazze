import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Painel Geral</h1>
        <p className="text-slate-500 mt-2 font-medium">Bem-vindo(a) de volta, {dbUser?.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Cards */}
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-500 text-sm tracking-wide uppercase">Inadimplência</h3>
          <p className="text-3xl font-bold mt-2 text-slate-900">R$ 0,00</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-500 text-sm tracking-wide uppercase">Unidades Ativas</h3>
          <p className="text-3xl font-bold mt-2 text-slate-900">0</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-[#2563EB] text-white p-6 shadow-lg shadow-blue-500/20">
          <h3 className="font-semibold text-white/80 text-sm tracking-wide uppercase">Próximo Vencimento</h3>
          <p className="text-xl font-bold mt-2">Nenhuma cobrança pendente</p>
        </div>
      </div>
    </div>
  );
}
