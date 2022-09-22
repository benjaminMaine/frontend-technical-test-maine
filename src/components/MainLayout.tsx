import { PropsWithChildren } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Header from './Header';
import ChangeUserModal from './ChangeUserModal';
import { useDisclosure } from '@chakra-ui/hooks';
import MainWrapper from './MainWrapper';

type MainLayoutProps = PropsWithChildren<{ userId: number | null }> & {
    handleChangeUser: (id: number) => void;
};
export const MainLayout = ({ children, handleChangeUser, userId }: MainLayoutProps) => {
    const year = new Date().getFullYear();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <div className={styles.container}>
            <Head>
                <title>Frontend Technical test - Leboncoin</title>
                <meta
                    name="description"
                    content="Frontend exercise for developpers who want to join us on leboncoin.fr"
                ></meta>
            </Head>
            <Header userId={userId} onOpen={onOpen} />
            <ChangeUserModal
                handleChangeUser={handleChangeUser}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                userId={userId}
            />
            <MainWrapper className={styles.main}>{children}</MainWrapper>
            <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
        </div>
    );
};
