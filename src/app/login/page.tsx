'use client';

import { useAuth } from '@/context/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LoginPage() {

    const { signIn, loading } = useAuth();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {

        event.preventDefault();
        signIn(phone, password);

    };

    useEffect(() => {

        const user = localStorage.getItem('@user');
        if (user) {

        }
    }, []);

    return (
        <main className="max-w-2xl mx-auto p-6 text-black">
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
            <form className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Telefone/Celular"
                    className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
                    onChange={(e: any) => setPhone(e.target.value)}
                    value={phone}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                    className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
                />

                <Link
                    href='/agenda'

                >
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>

                </Link>
            </form>
        </main>
    );
}