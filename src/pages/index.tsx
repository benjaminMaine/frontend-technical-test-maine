import { SWRConfig, unstable_serialize } from 'swr';
import { User } from '../types/user';
import { getLoggedUserId } from '../features/auth/utils/getLoggedUserId';
import { baseURL } from '../constants/baseURL';
import Home from '../components/Home';
import { GetServerSidePropsContext } from 'next/types';
import { MainLayout } from '../components/MainLayout';
import { UserId } from '../types/userId';
import { UserContextProvider } from '../contexts/useUserIdContext';

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

const App = ({ fallback }: { fallback: { users?: User[]; userId: UserId } }) => {
    return (
        <SWRConfig value={{ fallback }}>
            <UserContextProvider userId={fallback.userId}>
                <MainLayout>
                    <Home />
                </MainLayout>
            </UserContextProvider>
        </SWRConfig>
    );
};

export default App;
