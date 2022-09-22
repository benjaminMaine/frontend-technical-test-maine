import { ChakraProps, Stack } from '@chakra-ui/react';
import ChatHeader from './ChatHeader';
import { Conversation } from '../../../types/conversation';
import { getParticipantNickname } from '../../conversation/utils/getParticipantNickname';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';

type ChatProps = ChakraProps & {
    conversation: Conversation;
    userId: number | null;
};
export const Chat = ({ conversation, userId, ...styles }: ChatProps) => {
    const participants = getParticipantNickname(conversation, userId);

    return (
        <Stack
            flex={1}
            border="1px"
            borderColor="gray.light"
            borderRadius="lg"
            justifyContent="space-between"
            overflowY="hidden"
            spacing={3}
            {...styles}
        >
            <Stack>
                <ChatHeader title={participants} />
                <ChatMessages
                    conversationId={conversation.id}
                    userId={userId}
                    title={participants}
                />
            </Stack>
            <ChatFooter conversationId={conversation.id} userId={userId} />
        </Stack>
    );
};
