import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

import { Conversation } from '../../types/conversation';
import { messageByConversationIdFetcher } from '../../fetchers/messageByConversationIdFetcher';
import useSWR from 'swr';
import { getParticipantNickname } from '../utils/getParticipantNickname';
import { formatLastMessageDate } from '../utils/formatLastMessageDate';

type ConversationCardProps = {
    conversation: Conversation;
    userId: number | null;
};
export const ConversationCard = ({ conversation, userId }: ConversationCardProps) => {
    const { data: messages } = useSWR(
        ['messages', conversation.id],
        messageByConversationIdFetcher
    );
    const { lastMessageTimestamp } = conversation;
    const participants = getParticipantNickname(conversation, userId);
    return (
        <HStack
            border="1px"
            borderColor="gray.200"
            borderRadius="xl"
            boxShadow="base"
            flex={0}
            justifyContent="space-between"
            px={2}
            py={2}
            h="full"
        >
            <Avatar name={participants} />
            <Stack textAlign="end">
                <Text>{participants}</Text>
                <Text color="gray.500" fontSize="small">
                    {formatLastMessageDate(lastMessageTimestamp * 1000)}
                </Text>
            </Stack>
        </HStack>
    );
};
