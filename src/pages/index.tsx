import useSWR, { SWRConfig, unstable_serialize } from 'swr';
import { User } from '../types/user';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import { baseURL } from '../constants/baseURL';
import Home from '../components/Home';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import Header from '../components/Header';
import { useState } from 'react';
import { userByIdFetcher } from '../fetchers/userByIdFetcher';
import ChangeUserModal from '../components/ChangeUserModal';
import { useDisclosure } from '@chakra-ui/hooks';

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
    const year = new Date().getFullYear();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(fallback.userId);

    const handleChangeUser = (id: number) => {
        setSelectedUserId(id);
    };
    const { isValidating, data } = useSWR(['users', selectedUserId], userByIdFetcher);

    return (
        <SWRConfig value={{ fallback }}>
            <div className={styles.container}>
                <Head>
                    <title>Frontend Technical test - Leboncoin</title>
                    <meta
                        name="description"
                        content="Frontend exercise for developpers who want to join us on leboncoin.fr"
                    ></meta>
                </Head>
                <Header userId={selectedUserId} onOpen={onOpen} />
                <ChangeUserModal
                    handleChangeUser={handleChangeUser}
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    userId={selectedUserId}
                />
                <Home userId={selectedUserId} />
                <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
            </div>
        </SWRConfig>
    );
};

export default App;
