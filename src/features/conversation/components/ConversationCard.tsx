import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

import { Conversation } from '../../../types/conversation';
import { getParticipantNickname } from '../utils/getParticipantNickname';
import { formatLastMessageDate } from '../../chat/utils/formatLastMessageDate';
import React, { MouseEventHandler } from 'react';

type ConversationCardProps = {
    conversation: Conversation;
    isSelected: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
    userId: number | null;
};
export const ConversationCard = ({
    conversation,
    isSelected,
    onClick,
    userId,
}: ConversationCardProps) => {
    const { lastMessageTimestamp } = conversation;
    const participants = getParticipantNickname(conversation, userId);
    return (
        <HStack
            bg={isSelected ? 'gray.200' : 'inherit'}
            borderRadius="xl"
            boxShadow="base"
            flex={0}
            justifyContent="space-between"
            onClick={onClick}
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
