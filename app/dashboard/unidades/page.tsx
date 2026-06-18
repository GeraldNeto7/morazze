import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { Building2, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreateUnitModal } from '@/components/unidades/create-unit-modal';

export default async function UnidadesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  const units = await prisma.unit.findMany({
    where: { condominiumId: dbUser?.condominiumId || '' },
    orderBy: [{ block: 'asc' }, { number: 'asc' }]
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Unidades</h1>
          <p className="text-slate-500 mt-2 font-medium">Cadastre e gerencie os apartamentos e blocos.</p>
        </div>
        <CreateUnitModal />
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white overflow-hidden shadow-sm">
        {units.length > 0 ? (
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-slate-600">Bloco</TableHead>
                <TableHead className="font-semibold text-slate-600">Número</TableHead>
                <TableHead className="font-semibold text-slate-600">Morador</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id} className="group">
                  <TableCell className="font-medium text-slate-900">{unit.block || '-'}</TableCell>
                  <TableCell className="font-medium text-slate-900">{unit.number}</TableCell>
                  <TableCell className="text-slate-500">{unit.userId ? 'Cadastrado' : 'Vazio'}</TableCell>
                  <TableCell className="text-right text-slate-400 group-hover:text-slate-600 cursor-pointer">
                    <MoreHorizontal className="w-5 h-5 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-[#2563EB]/10 p-4 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-[#2563EB]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Nenhuma unidade cadastrada</h3>
            <p className="text-slate-500 mt-2 max-w-sm">
              Seu condomínio ainda não tem apartamentos ou lotes registrados. Clique no botão acima para adicionar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
