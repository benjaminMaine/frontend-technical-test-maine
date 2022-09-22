import { Stack } from '@chakra-ui/react';
import { ConversationCard } from '../components/ConversationCard';
import useSWR from 'swr';
import { conversationBySenderIdFetcher } from '../../fetchers/conversationBySenderIdFetcher';
import { map } from 'lodash';
import { Loader } from '../../components/Loader';

type ConversationListProps = {
    userId: number | null;
};
const ConversationList = ({ userId }: ConversationListProps) => {
    const { isValidating, data: conversations } = useSWR(
        ['conversations', userId],
        conversationBySenderIdFetcher
    );
    return (
        <Stack flex={{ base: 1, lg: 1 }} spacing={3}>
            {isValidating ? (
                <Loader />
            ) : (
                map(conversations, (conversation) => (
                    <ConversationCard conversation={conversation} userId={userId} />
                ))
            )}
        </Stack>
    );
};

export default ConversationList;
