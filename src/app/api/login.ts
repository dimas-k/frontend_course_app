'use server';

import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, 'Username tidak boleh kosong'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
});

export async function login(prevState: any, formData: FormData) {
  const rawData = {
    username: formData.get('username')?.toString().trim() || '',
    password: formData.get('password')?.toString().trim() || '',
  };

  console.log('📤 Data dikirim ke backend:', rawData);

  const parsed = formSchema.safeParse(rawData);
  if (!parsed.success) {
    console.log('❌ Validasi gagal:', parsed.error.format());
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });

    const data = await res.json();
    console.log('📥 Respon dari backend:', res.status, data);

    if (!res.ok) {
      return { error: data.message || 'Login gagal' };
    }

    return { success: true, user: data.user };
  } catch (err: any) {
    console.error('❌ Gagal menghubungi backend:', err);
    return { error: 'Tidak dapat terhubung ke server' };
  }
}
