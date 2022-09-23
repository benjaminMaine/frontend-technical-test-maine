import React, { MouseEventHandler } from 'react';
import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';
import { Conversation } from '../../../types/conversation';
import { getParticipantNickname } from '../utils/getParticipantNickname';
import { formatLastMessageDate } from '../../chat/utils/formatLastMessageDate';
import { useUserIdContext } from '../../../contexts/useUserIdContext';

type ConversationCardProps = {
    conversation: Conversation;
    isSelected: boolean;
    onClick: (id: Conversation['id']) => void;
};
export const ConversationCard = ({ conversation, isSelected, onClick }: ConversationCardProps) => {
    const { user } = useUserIdContext();
    const { lastMessageTimestamp } = conversation;
    const participants = getParticipantNickname(conversation, user.id);
    const handleClickConversationCard: MouseEventHandler = () => {
        onClick(conversation.id);
    };
    return (
        <HStack
            bg={isSelected ? 'gray.200' : 'inherit'}
            borderRadius="xl"
            boxShadow="base"
            cursor="pointer"
            flex={0}
            justifyContent="space-between"
            onClick={handleClickConversationCard}
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
