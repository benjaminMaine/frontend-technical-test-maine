import { useEffect, useRef } from 'react';
import { Center, Stack, Text } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import useSWR from 'swr';
import { getMessageByConversationIdFetcher } from '../fetchers/getMessageByConversationIdFetcher';
import { isEmpty, map } from 'lodash';
import { Loader } from '../../../components/Loader';
import { useUserIdContext } from '../../../contexts/useUserIdContext';
import { Conversation } from '../../../types/conversation';
type ChatMessagesProps = {
    conversationId: Conversation['id'];
    title: string;
};
const ChatMessages = ({ conversationId, title }: ChatMessagesProps) => {
    const { user } = useUserIdContext();
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { isValidating: isValidatingMessages, data: messages } = useSWR(
        ['messages', conversationId],
        getMessageByConversationIdFetcher
    );

    useEffect(() => {
        if (messagesContainerRef?.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (isValidatingMessages) {
        return <Loader size="sm" />;
    }
    if (isEmpty(messages)) {
        return <EmptyState title={title} />;
    }

    return (
        <Stack
            justifyContent="space-between"
            overflowY="auto"
            px={4}
            spacing={3}
            ref={messagesContainerRef}
        >
            {map(messages, (message) => (
                <ChatMessage
                    key={message.id}
                    isFromSender={user.id === message.authorId}
                    message={message}
                />
            ))}
        </Stack>
    );
};

export default ChatMessages;

const EmptyState = ({ title }: Pick<ChatMessagesProps, 'title'>) => {
    return (
        <Center height="full" mt={4}>
            <Text fontSize="xl" textAlign="center">
                This is the first time you send a message to {title}
            </Text>
        </Center>
    );
};
