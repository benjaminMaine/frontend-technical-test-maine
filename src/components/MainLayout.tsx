import { PropsWithChildren } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Header from '../features/auth/components/Header';
import ChangeUserModal from '../features/auth/components/ChangeUserModal';
import { useDisclosure } from '@chakra-ui/hooks';
import MainWrapper from './MainWrapper';
import { useUserIdContext } from '../contexts/useUserIdContext';

type MainLayoutProps = PropsWithChildren;
export const MainLayout = ({ children }: MainLayoutProps) => {
    const { login } = useUserIdContext();
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
            <Header onOpen={onOpen} />
            <ChangeUserModal
                handleChangeUser={login}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
            <MainWrapper className={styles.main}>{children}</MainWrapper>
            <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
        </div>
    );
};
