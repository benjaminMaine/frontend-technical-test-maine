import { useEffect, useState } from 'react';
import ConversationList from '../features/conversation/components/ConversationList';
import useSWR from 'swr';
import { Loader } from './Loader';
import { Center, Text, useMediaQuery } from '@chakra-ui/react';
import { Chat } from '../features/chat/components/Chat';
import { RESPONSIVE_MEDIA_QUERIES } from '../constants/responsiveMediaQueries';
import { getConversationBySenderIdFetcher } from '../features/conversation/fetchers/getConversationBySenderIdFetcher';
import { find, isEmpty, isNumber } from 'lodash';
import { useUserIdContext } from '../contexts/useUserIdContext';
import { UserId } from '../types/userId';
import { Conversation } from '../types/conversation';

const Home = () => {
    const { isLoading: isValidatingUser, user } = useUserIdContext();
    const [isMobile] = useMediaQuery(RESPONSIVE_MEDIA_QUERIES.IS_MOBILE);

    const { isValidating: isValidatingConversation, data: conversations } = useSWR(
        ['conversations', isNumber(user?.id) ? user.id : null],
        getConversationBySenderIdFetcher
    );

    const [selectedConversationId, setSelectedConversationId] = useState<UserId>();
    const selectedConversation = find(conversations, ({ id }) => id === selectedConversationId);

    useEffect(() => {
        if (isValidatingConversation) {
            setSelectedConversationId(null);
        }
        if (!isEmpty(conversations) && !isMobile) {
            setSelectedConversationId(conversations[0]?.id);
        }
    }, [conversations, isMobile, isValidatingConversation]);

    const handleClickConversationCard = (id: Conversation['id']) => {
        setSelectedConversationId(id);
    };

    if (isValidatingUser || isValidatingConversation) {
        return <Loader size="xl" />;
    }
    return (
        <>
            {!isMobile && user?.id && selectedConversation && !isEmpty(conversations) && (
                <Chat conversation={selectedConversation} flex={{ lg: 2, '2xl': 4 }} mr={4} />
            )}
            {user ? (
                <ConversationList
                    conversations={conversations}
                    isLoading={isValidatingConversation}
                    selectedConversationId={selectedConversationId}
                    handleClickConversationCard={handleClickConversationCard}
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
