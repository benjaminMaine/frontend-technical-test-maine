import { User } from '../../../types/user';
import { isEmpty, isNumber } from 'lodash';
import { baseURL } from '../../../constants/baseURL';
import { setCookie, removeCookies } from 'cookies-next';

const NOT_LOGGED_USER = {
    isLogged: false,
    user: null,
};

export const getUserByIdFetcher = async (
    resource: string,
    userId: number
): Promise<{ isLogged: boolean; user: User | null }> => {
    if (!isNumber(userId)) {
        return NOT_LOGGED_USER;
    }
    const user = await fetch(`${baseURL}/${resource}/${userId}`).then((res) => res.json());
    if (!user || isEmpty(user)) {
        removeCookies('token');
        return { isLogged: false, user: null };
    }
    setCookie('user', JSON.stringify(user));
    return {
        isLogged: true,
        user,
    };
};
