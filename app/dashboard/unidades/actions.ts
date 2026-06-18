'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createUnit(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Não autenticado");

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  
  if (!dbUser?.condominiumId || dbUser.role !== 'SINDICO') {
    throw new Error("Sem permissão ou condomínio inválido.");
  }

  const block = formData.get('block') as string;
  const number = formData.get('number') as string;

  if (!number) throw new Error("Número da unidade é obrigatório");

  await prisma.unit.create({
    data: {
      block: block || null,
      number,
      condominiumId: dbUser.condominiumId
    }
  });

  revalidatePath('/dashboard/unidades');
}
