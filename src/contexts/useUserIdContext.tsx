import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { UserId } from '../types/userId';
import { isNumber, noop } from 'lodash';
import { deleteCookie, setCookie } from 'cookies-next';
import { User } from '../types/user';
import { baseURL } from '../constants/baseURL';
import useSWR from 'swr';
import { getUserByIdFetcher } from '../features/auth/fetchers/getUserByIdFetcher';

type IUserContext = {
    user: User | null;
    isLoading: boolean;
    login: (id: UserId) => Promise<void>;
    logout: () => void;
};

const UserContextInit = {
    user: null,
    isLoading: false,
    login: () => Promise.resolve(),
    logout: noop,
};

const UserContext = createContext<IUserContext>(UserContextInit);

export const UserContextProvider = ({
    children,
    userId,
}: PropsWithChildren<{ userId: UserId }>) => {
    const [currentUserId, setCurrentUserId] = useState<UserId>(userId);
    const { isValidating: isLoading, data: user } = useSWR(
        ['users', currentUserId],
        getUserByIdFetcher
    );
    const providerValue = useMemo(
        () => ({
            isLoading,
            login: async (id: UserId) => {
                const user: User = await fetch(`${baseURL}/users/${id}`).then((res) => res.json());
                setCookie('user', user);
                setCurrentUserId(isNumber(user.id) ? user.id : null);
            },
            logout: () => {
                setCurrentUserId(null);
                deleteCookie('user');
            },
            user,
        }),
        [isLoading, user]
    );
    return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export const useUserIdContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('This component must be used within a <UserIdContextProvider>.');
    }
    return context;
};
