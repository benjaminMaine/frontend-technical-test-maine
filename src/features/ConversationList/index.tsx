import { Stack } from '@chakra-ui/react';
import { ConversationCard } from '../components/ConversationCard';

import { User } from '../../types/user';

type ConversationListProps = {
    user?: User;
};
const ConversationList = ({ user }: ConversationListProps) => {
    // const { data } = useSWR(['/users', user.id], userFetcher);
    return (
        <Stack flex={1} spacing={3}>
            <ConversationCard
                avatar={{ src: '/efez' }}
                lastMessageTimestamp={123456789}
                phoneNumber="0680808080"
            />
            <ConversationCard
                avatar={{ src: '/efez' }}
                lastMessageTimestamp={123456789}
                phoneNumber="0680808080"
            />
        </Stack>
    );
};

export default ConversationList;
