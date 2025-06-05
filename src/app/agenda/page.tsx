"use client";
import { useAuth } from '@/context/auth';
import axios from 'axios';
import { use, useEffect, useState } from 'react';


export default function Agenda() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        nome: '',
        date: '',
        time: '',
        description: '',
        id: '',
        phone: '',
    });


    useEffect(() => {
        const userData = localStorage.getItem('@user');
        if (userData) {
            const parsedData = JSON.parse(userData);


            setFormData({
                nome: parsedData.data.customer.name,
                date: '',
                time: '',
                description: '',
                id: parsedData.data.customer.id,
                phone: parsedData.data.customer.phone,

            });
        }
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/customers', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="max-w-2xl mx-auto p-6 text-black">
            <h1 className="text-gray-400 text-center m-10 text-xl text-bold ">Agendar consulta</h1>
            <h2 className="text-gray-400 text-center m-10 text-xl text-bold ">{`Nome: ${formData.nome}`}</h2>
            <h3 className="text-gray-400 text-center m-10 text-xl text-bold ">{`ID: ${formData.id}`}</h3>

            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                            Nome
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="nome"
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <label>Data</label>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="date"
                            type="date"
                            name="date" // Added name attribute
                            placeholder="Data"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <label>Horário</label>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="time"
                            type="time"
                            name="time"
                            placeholder="Horário"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <label>Observação</label>
                <textarea
                    name="description"
                    id=""
                    className="bg-gray-200 px-16 text-gray-500 border border-gray-200 w-full"
                    placeholder="Observação"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                <div className="md:flex md:items-center">
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Agendar
                        </button>
                    </div>
                </div>
            </form>

        </main>
    );
}