"use client";

import React,
{
	createContext,
	ReactNode,
	useContext,
	useState,
} from 'react';

import { api } from '../api/api';


type User = {
	message: string;
	data: {
		customer: {
			id: string;
			name: string;
			phone: string;
		}
	}
	token: string;
}


type appointments = {
	customer_id: string;
	scheduled_at: string;
	notes: string;
}

type AppContextData = {
	loading: boolean;
	user: User;
	signIn: (phone: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	appointments: (customer_id: string, scheduled_at: string, notes: string) => Promise<void>;
	listAppointments: () => Promise<void>;
	list: any;
}

type AuthProviderProps = {
	children: ReactNode;
}


export const AppContext = createContext({} as AppContextData);

function AppProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState([]);

	async function signIn(phone: string, password: string) {
		try {
			setLoading(true);

			// const authUrl = `${api.defaults.baseURL}/customers/login}`;

			const response = await api.post('customers/login', {
				phone,
				password
			},
				{
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}
			)

			const { data } = response;


			if (data && data.data.token) {
				setUser(data);


				api.defaults.headers;

				localStorage.setItem('@user', JSON.stringify(data));

				setLoading(false);

				window.location.href = '/agenda';


			} else {
				localStorage.removeItem('@user');
			}


		} catch {
			alert('Usuário não encontrado ou senha incorreta');
			throw new Error('Não foi possivel autenticar');
		} finally {
			setLoading(false);
		}
	}

	async function appointments(customer_id: string, scheduled_at: string, notes: string) {
		try {
			setLoading(true);

			// const authUrl = `${api.defaults.baseURL}/customers/login}`;

			const response = await api.post('/appointments', {
				customer_id,
				scheduled_at,
				notes
			},
				{
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}
			)

			const { data } = response;


			if (data) {

				localStorage.setItem('@appointments', JSON.stringify(data));

				setLoading(false);

				listAppointments();

			} else {
				localStorage.removeItem('@appointments');
			}


		} catch {
			alert('');
			throw new Error('');
		} finally {
			setLoading(false);
		}
	}

	async function listAppointments() {
		try {
			setLoading(true);

			// const authUrl = `${api.defaults.baseURL}/customers/login}`;

			const response = await api.get('/appointments',
				{
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}
			)

			const { data } = response;


			if (data) {

				localStorage.setItem('@listAppointments', JSON.stringify(data));


				setList(data);

				setLoading(false);

				console.log('List of appointments:', data);

				// window.location.href = '/agenda';


			} else {
				localStorage.removeItem('@listAppointments');
			}


		} catch {
			alert('');
			throw new Error('');
		} finally {
			setLoading(false);
		}
	}

	async function signOut() {
		// setUser({} as User);
		// await AsyncStorage.removeItem(COLLECTION_USERS);
	}

	// async function loadUserStorageData() {
	// 	const storage = await AsyncStorage.getItem(COLLECTION_USERS);

	// 	if (storage) {
	// 		const userLogged = JSON.parse(storage) as User;
	// 		api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

	// 		setUser(userLogged);
	// 	}
	// }

	// useEffect(() => {
	// 	loadUserStorageData();
	// }, []);



	return (
		<AppContext.Provider value={{
			user,
			signIn,
			loading,
			signOut,
			appointments,
			listAppointments,
			list
		}}>
			{children}
		</AppContext.Provider>
	)
}

function useApp() {
	const context = useContext(AppContext);

	return context;
}

export {
	AppProvider,
	useApp
}

//11958821329
//123456789