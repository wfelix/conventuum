"use client";
import { useApp } from '@/context/appContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';


export default function Agenda() {
    const { signOut } = useApp();
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        passwordReview: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.passwordReview) {
            setError("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        await api.post(`/customer`,
            {
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        setSuccess(false);
        try {


            setSuccess(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <header >
                <ul className="flex justify-center space-x-4 bg-gray-200 p-4 text-blue-700">

                    <li><Link href="/lista-agenda" >Ver agenda</Link></li>
                    <li><Link href="/lista-medico" >Ver médicos</Link></li>
                    <li><Link href="/agenda" >Criar consulta  </Link></li>
                    <li><Link href="/lista-cliente" >Ver clientes  </Link></li>
                    <li><Link href="/cadastrar-cliente" >Cadastrar clientes  </Link></li>

                </ul>
            </header>
            <div className="max-w-2xl mx-auto p-6 text-black">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={signOut}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Sair
                    </button>
                </div>
                <h1 className="text-gray-400 text-center m-10 text-xl font-bold">Cadastrar médico</h1>
                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Nome
                        </label>
                        <input
                            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                            phone
                        </label>
                        <input
                            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input
                            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                            id="password"
                            type="text"
                            name="password"
                            placeholder="Especialidade"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="passwordReview">
                            Senha Novamente
                        </label>
                        <input
                            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                            id="passwordReview"
                            type="text"
                            name="passwordReview"
                            placeholder="Especialidade"
                            value={formData.passwordReview}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Criando...' : 'Criar'}
                        </button>
                    </div>
                    {success && (
                        <div className="text-green-600 text-center mt-4 font-semibold">Criado com sucesso!</div>
                    )}
                </form>

            </div>
        </div>


    );
}
