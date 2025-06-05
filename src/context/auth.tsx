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

type AuthContextData = {
	loading: boolean;
	user: User;
	signIn: (phone: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
}

type AuthProviderProps = {
	children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);
	const [loading, setLoading] = useState(false);

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

			console.log('retorno', data);


			if (data && data.token) {
				setUser(data);

				api.defaults.headers;

				localStorage.setItem('@user', JSON.stringify(data));

				setLoading(false);
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
		<AuthContext.Provider value={{
			user,
			signIn,
			loading,
			signOut
		}}>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export {
	AuthProvider,
	useAuth
}