"use client";
import { useApp } from '@/context/appContext';
import { useEffect, useState } from 'react';

export default function Agenda() {
    const { appointments, list, listAppointments } = useApp();
    const [customerIdLogado, setCustomerIdLogado] = useState('');

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
            const customerId = parsedData.data.customer.id;

            setFormData({
                nome: parsedData.data.customer.name,
                date: '',
                time: '',
                notes: '',
                customer_id: customerId,
                phone: parsedData.data.customer.phone,
            });

            setCustomerIdLogado(customerId);
        }
    }, []);

    useEffect(() => {
        listAppointments();
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
        return `T${horaUtc}:${minuto}:${segundos}.${milissegundos}Z`;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedTime = formatarHora(formData.time);
        appointments(formData.customer_id, `${formData.date}${formattedTime}`, formData.notes);
    };

    return (
        <main className="max-w-2xl mx-auto p-6 text-black">
            <h1 className="text-gray-400 text-center m-10 text-xl font-bold">Agendar consulta</h1>

            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="nome">Nome</label>
                    <input
                        className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                        id="nome"
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="telefone">Telefone</label>
                    <input
                        className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                        id="telefone"
                        type="text"
                        name="phone"
                        placeholder="Telefone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="date">Data</label>
                    <input
                        className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="time">Horário</label>
                    <input
                        className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                        id="time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="notes">Observação</label>
                    <textarea
                        name="notes"
                        id="notes"
                        className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white"
                        placeholder="Observação"
                        value={formData.notes}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        type="submit"
                    >
                        Agendar
                    </button>
                </div>

                {list && list.length > 0 && (
                    <ul>
                        {list
                            .filter((item: any) => item.customer_id === customerIdLogado)
                            .map((item: any, index: number) => (
                                <li
                                    key={index}
                                    className="border border-gray-200 rounded p-4 mb-4"
                                >
                                    <h3 className="text-gray-600">
                                        Horário: <br />
                                        {new Date(item.scheduled_at).toLocaleString('pt-BR')}
                                    </h3>
                                    <h3 className="text-gray-500 mt-2">
                                        Observação: <br />
                                        {item.notes}
                                    </h3>
                                </li>
                            ))}
                    </ul>
                )}
            </form>
        </main>
    );
}
