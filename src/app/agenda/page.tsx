"use client";
import { useAuth } from '@/context/auth';
import axios from 'axios';
import { use, useEffect, useState } from 'react';


export default function Agenda() {
    const { appointments } = useAuth();

    const [formData, setFormData] = useState({
        nome: '',
        date: '',
        time: '',
        notes: '',
        customer_id: '',
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
                notes: '',
                customer_id: parsedData.data.customer.id,
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

    function formatarHora(time: string) {

        const [hora, minuto] = time.split(':');

        const segundos = "37";
        const milissegundos = "958";

        const horaUtc = parseInt(hora) + 1;


        const horaFormatada = `T${horaUtc}:${minuto}:${segundos}.${milissegundos}Z`;

        return horaFormatada;
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedTime = formatarHora(formData.time);

        appointments(formData.customer_id, `${formData.date}${formattedTime}`, formData.notes);

    };


    return (
        <main className="max-w-2xl mx-auto p-6 text-black">
            <h1 className="text-gray-400 text-center m-10 text-xl text-bold ">Agendar consulta</h1>

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
                <label>Telefone</label>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="telefone"
                            type="text"
                            name="telefone"
                            placeholder="Telefone"
                            value={formData.phone}
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
                    name="notes"
                    id=""
                    className="bg-gray-200 px-16 text-gray-500 border border-gray-200 w-full"
                    placeholder="Observação"
                    value={formData.notes}
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