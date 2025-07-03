"use client";
import { useApp } from '@/context/appContext';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import Link from 'next/link';

export default function Agenda() {
    const { customerList, listCustomer, signOut } = useApp();

    useEffect(() => {
        listCustomer();
    }, []);

    return (
        <>
            <header >
                <ul className="flex justify-center space-x-4 bg-gray-200 p-4 text-blue-700">
                    <li><Link href="/lista-agenda" >Ver agenda</Link></li>
                    <li><Link href="/agenda" >Criar consulta  </Link></li>
                    <li><Link href="/cadastrar-medico" >Cadastrar médicos</Link></li>
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
                {/* <h1 className="text-gray-400 text-center m-10 text-xl font-bold">Lista de médicos</h1> */}

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Lista de usuários</h2>
                    <div className="space-y-4">


                        {customerList.map((doctors: any) => (

                            <div key={doctors.id} className="bg-white p-4 rounded-lg shadow flex flex-raw justify-between items-center">
                                <div>
                                    <div className='flex gap-2 items-center mb-4'>
                                        <label >{`Nome: ${doctors.name}`} </label>

                                    </div>
                                    <div className='flex gap-2 items-center mb-4'>
                                        <label>  {`Telefone: ${doctors.phone}`}</label>
                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>


    );
}
