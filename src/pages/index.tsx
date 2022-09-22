import { SWRConfig, unstable_serialize } from 'swr';
import { User } from '../types/user';
import { getLoggedUserId } from '../features/auth/utils/getLoggedUserId';
import { baseURL } from '../constants/baseURL';
import Home from '../components/Home';
import { GetServerSidePropsContext } from 'next/types';

import { MainLayout } from '../components/MainLayout';
import { useState } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        req: { cookies },
    } = context;
    const userId: User['id'] | null = getLoggedUserId(cookies?.user);
    const user: User = await fetch(`${baseURL}/users/${userId}`).then((res) => res.json());
    const users: User[] = await fetch(`${baseURL}/users`).then((res) => res.json());
    return {
        props: {
            fallback: {
                users,
                userId,
                [unstable_serialize(['users', userId])]: user,
            },
        },
    };
}

const App = ({ fallback }: { fallback: { users?: User[]; userId: number | null } }) => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(fallback.userId || null);
    const handleChangeUser = (id: number) => {
        setSelectedUserId(id);
    };
    return (
        <SWRConfig value={{ fallback }}>
            <MainLayout userId={selectedUserId} handleChangeUser={handleChangeUser}>
                <Home userId={selectedUserId} />
            </MainLayout>
        </SWRConfig>
    );
};

export default App;
