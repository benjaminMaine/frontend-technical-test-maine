import { Center, Stack, Text } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import useSWR from 'swr';
import { getMessageByConversationIdFetcher } from '../fetchers/getMessageByConversationIdFetcher';
import { isEmpty, map } from 'lodash';
import { Loader } from '../../../components/Loader';
import { useEffect, useRef } from 'react';
type ChatMessagesProps = {
    conversationId: number;
    userId: number | null;
    title: string;
};
const ChatMessages = ({ conversationId, userId, title }: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const { isValidating: isValidatingMessages, data: messages } = useSWR(
        ['messages', conversationId],
        getMessageByConversationIdFetcher
    );

    useEffect(() => {
        if (bottomRef?.current) {
            bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (isValidatingMessages) {
        return <Loader size="sm" />;
    }
    if (isEmpty(messages)) {
        return <EmptyState title={title} />;
    }
    return (
        <Stack justifyContent="space-between" overflowY="auto" px={4} spacing={3}>
            {map(messages, (message) => (
                <ChatMessage
                    key={message.id}
                    isFromSender={userId === message.authorId}
                    message={message}
                />
            ))}
            <div ref={bottomRef} />
        </Stack>
    );
};

export default ChatMessages;

const EmptyState = ({ title }: Pick<ChatMessagesProps, 'title'>) => {
    return (
        <Center height="full">
            <Text fontSize="xl" textAlign="center">
                This is the first time you send a message to {title}
            </Text>
        </Center>
    );
};
