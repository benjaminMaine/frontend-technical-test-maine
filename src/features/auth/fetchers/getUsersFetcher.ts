import { User } from '../../../types/user';
import { baseURL } from '../../../constants/baseURL';

export const getUsersFetcher = async (resource: string): Promise<User[]> => {
    const users = await fetch(`${baseURL}/${resource}`).then((res) => res.json());
    return users;
};
