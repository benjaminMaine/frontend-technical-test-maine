import styles from '../styles/Home.module.css';
import MainWrapper from './MainWrapper';
import ConversationList from '../features/ConversationList';
import useSWR from 'swr';
import { userByIdFetcher } from '../fetchers/userByIdFetcher';
import { Loader } from './Loader';
import { Center, Text, useMediaQuery } from '@chakra-ui/react';
import { Chat } from '../features/chat';
import { RESPONSIVE_MEDIA_QUERIES } from '../constants/responsiveMediaQueries';

const Home = ({ userId }: { userId: number | null }) => {
    const { isValidating, data } = useSWR(['users', userId], userByIdFetcher);
    const [isMobile] = useMediaQuery(RESPONSIVE_MEDIA_QUERIES.IS_MOBILE);
    if (isValidating) {
        return <Loader size="xl" />;
    }
    return (
        <MainWrapper className={styles.main}>
            {!isMobile && <Chat flex={{ lg: 2, '2xl': 4 }} mr={6} />}
            {data?.isLogged ? <ConversationList userId={userId} /> : <HomeEmptyState />}
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
