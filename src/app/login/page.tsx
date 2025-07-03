'use client';

import { useApp } from '@/context/appContext';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';


export default function LoginPage() {

    const { signIn, loading } = useApp();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {

        event.preventDefault();
        signIn(phone, password);

    };

    useEffect(() => {
        const user = localStorage.getItem('@user');
        if (user) {
            window.location.href = '/lista-agenda';
        }
    }, []);

    return (
        <main className="max-w-2xl mx-auto p-6 text-black">
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
            <form className="flex flex-col items-center" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Telefone/Celular"
                    className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
                    onChange={(e: any) => setPhone(e.target.value)}
                    value={phone}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                    className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </main>
    );
}