import { User } from '../../../types/user';
import { isEmpty, isNumber } from 'lodash';
import { baseURL } from '../../../constants/baseURL';
import { setCookie, removeCookies } from 'cookies-next';

export const getUserByIdFetcher = async (resource: string, userId: number): Promise<User> => {
    if (!isNumber(userId)) {
        return null;
    }
    const user = await fetch(`${baseURL}/${resource}/${userId}`).then((res) => res.json());
    if (!user || isEmpty(user)) {
        removeCookies('token');
        return null;
    }
    setCookie('user', JSON.stringify(user));
    return user;
};
