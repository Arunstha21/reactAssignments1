import axios from 'axios';
import type { FormValues } from '@/components/user/userForm';

type Users = FormValues & {id: string };

const userAPI = axios.create({
    baseURL: 'https://66d44b475b34bcb9ab3e2fd8.mockapi.io/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});


async function getUsers() {
    try {
        const response = await userAPI.get<Users>(`/users`);
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export { getUsers };
