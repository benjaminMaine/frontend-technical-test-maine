import { ChakraProps, Stack } from '@chakra-ui/react';
import ChatHeader from './ChatHeader';
import { Conversation } from '../../../types/conversation';
import { getParticipantNickname } from '../../conversation/utils/getParticipantNickname';
import ChatMessages from './ChatMessages';
import ChatFooter from './ChatFooter';
import { useUserIdContext } from '../../../contexts/useUserIdContext';

type ChatProps = ChakraProps & {
    conversation: Conversation;
};
export const Chat = ({ conversation, ...styles }: ChatProps) => {
    const { user } = useUserIdContext();
    const participants = getParticipantNickname(conversation, user.id);

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
            <Stack overflowY="hidden">
                <ChatHeader title={participants} />
                <ChatMessages conversationId={conversation.id} title={participants} />
            </Stack>
            <ChatFooter conversationId={conversation.id} />
        </Stack>
    );
};
