import ConversationList from '../features/conversation/components/ConversationList';
import useSWR from 'swr';
import { getUserByIdFetcher } from '../features/auth/fetchers/getUserByIdFetcher';
import { Loader } from './Loader';
import { Center, Text, useMediaQuery } from '@chakra-ui/react';
import { Chat } from '../features/chat/components/Chat';
import { RESPONSIVE_MEDIA_QUERIES } from '../constants/responsiveMediaQueries';
import { getConversationBySenderIdFetcher } from '../features/conversation/fetchers/getConversationBySenderIdFetcher';
import { useEffect, useState } from 'react';
import { find, isEmpty } from 'lodash';

const Home = ({ userId }: { userId: number | null }) => {
    const { isValidating: isValidatingUser, data: user } = useSWR(
        ['users', userId],
        getUserByIdFetcher
    );
    const { isValidating: isValidatingConversation, data: conversations } = useSWR(
        ['conversations', userId],
        getConversationBySenderIdFetcher
    );
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>();
    const [isMobile] = useMediaQuery(RESPONSIVE_MEDIA_QUERIES.IS_MOBILE);

    useEffect(() => {
        if (isValidatingConversation) {
            setSelectedConversationId(null);
        }
        if (!isEmpty(conversations) && !isMobile) {
            setSelectedConversationId(conversations[0]?.id);
        }
    }, [conversations, isMobile, isValidatingConversation]);

    if (isValidatingUser || isValidatingConversation) {
        return <Loader size="xl" />;
    }
    return (
        <>
            {!isMobile && userId && conversations && !isEmpty(conversations) && (
                <Chat
                    conversation={find(conversations, ({ id }) => id === selectedConversationId)}
                    flex={{ lg: 2, '2xl': 4 }}
                    mr={4}
                    userId={userId}
                />
            )}
            {user?.isLogged ? (
                <ConversationList
                    conversations={conversations}
                    isLoading={isValidatingConversation}
                    selectedConversationId={selectedConversationId}
                    setSelectedConversationId={setSelectedConversationId}
                    userId={userId}
                />
            ) : (
                <HomeEmptyState />
            )}
        </>
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
