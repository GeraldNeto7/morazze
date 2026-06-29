const ASAAS_API_URL = 'https://sandbox.asaas.com/api/v3';

export async function createAsaasCustomer(data: { name: string, cpfCnpj: string, email: string, phone?: string }) {
  if (!process.env.ASAAS_API_KEY) {
    console.log('Asaas API: Executando em modo MOCK (Sem ASAAS_API_KEY)');
    return {
      id: `cus_mock_${Math.random().toString(36).substring(2, 9)}`,
      name: data.name,
      email: data.email,
    };
  }

  const res = await fetch(`${ASAAS_API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': process.env.ASAAS_API_KEY
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('Asaas Customer Error:', json);
    throw new Error(json.errors?.[0]?.description || 'Erro ao criar cliente localmente no Asaas');
  }
  return json; // { id: 'cus_000005232', ... }
}

export async function createAsaasCharge(data: { customer: string, billingType: 'PIX' | 'BOLETO', value: number, dueDate: string, description: string }) {
  if (!process.env.ASAAS_API_KEY) {
    console.log('Asaas API: Executando em modo MOCK (Sem ASAAS_API_KEY)');
    return {
      id: `pay_mock_${Math.random().toString(36).substring(2, 9)}`,
      invoiceUrl: 'https://sandbox.asaas.com/i/mock-invoice-url',
      bankSlipUrl: data.billingType === 'BOLETO' ? 'https://sandbox.asaas.com/b/mock-slip-url' : undefined,
    };
  }

  const res = await fetch(`${ASAAS_API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': process.env.ASAAS_API_KEY
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('Asaas Charge Error:', json);
    throw new Error(json.errors?.[0]?.description || 'Erro ao gerar cobrança final no Asaas');
  }
  return json;
}

