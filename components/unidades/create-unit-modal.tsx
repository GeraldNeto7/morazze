'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { createUnit } from '@/app/dashboard/unidades/actions';

export function CreateUnitModal() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function action(formData: FormData) {
    setPending(true);
    setError('');
    try {
      await createUnit(formData);
      setOpen(false);
    } catch (e: any) {
       setError(e.message || 'Erro ao criar a unidade');
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2.5 rounded-[14px] font-semibold tracking-wide transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="w-5 h-5" />
          <span>Nova Unidade</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[24px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Cadastrar Unidade</DialogTitle>
            <DialogDescription className="text-slate-500">
              Adicione uma nova unidade ao seu condomínio.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            {error && <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-xl">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="block" className="text-slate-700 font-semibold">Bloco/Andar (Opcional)</Label>
              <Input id="block" name="block" placeholder="Ex: Bloco A" className="col-span-3 rounded-xl border-slate-200 h-12" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number" className="text-slate-700 font-semibold">Número *</Label>
              <Input id="number" name="number" placeholder="Ex: 101" required className="col-span-3 rounded-xl border-slate-200 h-12" />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl border-slate-200" disabled={pending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={pending} className="bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20">
              {pending ? 'Salvando...' : 'Salvar Unidade'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
