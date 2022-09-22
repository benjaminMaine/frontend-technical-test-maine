import styles from '../styles/Home.module.css';
import MainWrapper from './MainWrapper';
import ConversationList from '../features/ConversationList';
import useSWR from 'swr';
import { userByIdFetcher } from '../fetchers/userByIdFetcher';
import { Loader } from './Loader';
import { Center, Text } from '@chakra-ui/react';

const Home = ({ userId }: { userId?: number }) => {
    const { isValidating, data } = useSWR(['users', userId], userByIdFetcher);
    if (isValidating) {
        return <Loader size="xl" />;
    }
    return (
        <MainWrapper className={styles.main}>
            {data?.isLogged ? <ConversationList /> : <HomeEmptyState />}
        </MainWrapper>
    );
};

export default Home;

const HomeEmptyState = () => {
    return (
        <Center flex={1}>
            <Text>Please connect to an account first</Text>
        </Center>
    );
};
