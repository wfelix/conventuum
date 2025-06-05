

export default function Agenda() {
    return (
        <main className="max-w-2xl mx-auto p-6 text-black">
            <h1 className="text-gray-400 text-center m-10 text-xl text-bold ">Agendar consulta</h1>

            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                            Nome
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nome" type="text" placeholder="Nome" />
                    </div>
                </div>
                <label >Data</label>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">

                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="date" type="date" placeholder="Data" />
                    </div>
                </div>
                <label >Horário</label>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="time" type="time" placeholder="Horário" />
                    </div>
                </div>
                <textarea name="description" id="" className="bg-gray-200 px-16 text-gray-500 border border-gray-200 w-full  " placeholder="Observação"></textarea>
                <div className="md:flex md:items-center">
                    <div className="md:w-2/3">
                        <button className="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Enviar
                        </button>
                    </div>
                </div>
            </form>

        </main>
    );
}