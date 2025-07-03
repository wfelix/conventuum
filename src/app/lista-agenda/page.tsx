"use client";
import { useApp } from '@/context/appContext';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import Link from 'next/link';

export default function Agenda() {
    const { list, listAppointments, signOut } = useApp();
    const [
        scheduleSelected, setScheduleSelected,
    ] = useState<any>({});

    useEffect(() => {
        listAppointments();
    }, []);

    async function handlerUpdateSchedule() {
        await api.patch(`/appointments/${scheduleSelected.id}`, {
            "scheduled_at": scheduleSelected.scheduled_at,
            "notes": scheduleSelected.notes,
            "status": scheduleSelected.status,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )

        await listAppointments();

        setScheduleSelected({});
    }

    const formatDate = (schedule: any, name: string) => {
        if (schedule.id === scheduleSelected.id) {
            return scheduleSelected[name]
        }
        return schedule[name]
    }

    return (
        <>
            <header >
                <ul className="flex justify-center space-x-4 bg-gray-200 p-4 text-blue-700">

                    <li><Link href="/lista-medico" >Ver médicos</Link></li>
                    <li><Link href="/agenda" >Criar consulta  </Link></li>
                    <li><Link href="/cadastrar-medico" >Cadastrar médicos</Link></li>
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
                <h1 className="text-gray-400 text-center m-10 text-xl font-bold">Lista de consultas</h1>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Seus Agendamentos</h2>
                    <div className="space-y-4">
                        {list
                            .map((appointment: any) => (
                                <div key={appointment.id} className="bg-white p-4 rounded-lg shadow flex flex-raw justify-between items-center">


                                    <div className='w-full'>
                                        <div className='flex gap-2 items-center mb-4'>
                                            <label htmlFor="id">Nome cliente:</label>
                                            <input id="id" type="text" className="p-2 border border-gray-500 rounded w-full max-w-xs" value={appointment.customer.name}
                                                disabled />
                                        </div>
                                        <div className='flex gap-2 items-center mb-4'>
                                            <label htmlFor="Date">Data:</label>
                                            <input id="Date" type="datetime-local" className="p-2 border border-gray-500 rounded w-full max-w-xs" value={formatDate(appointment, "scheduled_at")?.slice(0, 16)} onChange={(event) => {
                                                setScheduleSelected((e: any) => ({
                                                    ...e,
                                                    scheduled_at: event.target.value
                                                }))
                                            }} disabled={appointment.id !== scheduleSelected.id} />
                                        </div>
                                        <div className='flex gap-2 items-center mb-4'>
                                            <label htmlFor="notes">Observações:</label>
                                            <input id="notes" className="p-2 border border-gray-500 rounded w-full max-w-xs" value={formatDate(appointment, "notes")} disabled={appointment.id !== scheduleSelected.id}
                                                onChange={(event) => {
                                                    setScheduleSelected((e: any) => ({
                                                        ...e,
                                                        notes: event.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                        <div className='flex gap-2 items-center mb-4'>
                                            <label htmlFor="status">Status:</label>
                                            <input id="status" className="p-2 border border-gray-500 rounded w-full max-w-xs" value={formatDate(appointment, "status")} disabled={appointment.id !== scheduleSelected.id}
                                                onChange={(event) => {
                                                    setScheduleSelected((e: any) => ({
                                                        ...e,
                                                        status: event.target.value
                                                    }))
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {
                                        scheduleSelected.id === appointment.id ? (
                                            <button onClick={() => { handlerUpdateSchedule() }}>Salvar</button>
                                        ) : (
                                            <button onClick={() => setScheduleSelected(appointment)}>Editar</button>
                                        )
                                    }


                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>


    );
}
