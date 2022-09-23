import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useState } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
import useSWR, { useSWRConfig } from 'swr';
import { postNewMessage } from '../fetchers/postNewMessage';
import { Conversation } from '../../../types/conversation';
import { useUserIdContext } from '../../../contexts/useUserIdContext';
import { getMessageByConversationIdFetcher } from '../fetchers/getMessageByConversationIdFetcher';

const ENTER_KEY = 'Enter';
type ChatFooterProps = {
    conversationId: Conversation['id'];
};
const ChatFooter = ({ conversationId }: ChatFooterProps) => {
    const { user } = useUserIdContext();
    const [message, setMessage] = useState('');
    const { mutate } = useSWRConfig();
    const { data: messages } = useSWR(
        ['messages', conversationId],
        getMessageByConversationIdFetcher
    );
    const handleChangeMessage: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setMessage(value);
    };

    const sendMessage = async () => {
        const timestamp = new Date().getTime();
        const payload = {
            authorId: user.id,
            body: message,
            conversationId,
            timestamp,
        };
        await mutate(
            ['messages', conversationId],
            () => {
                postNewMessage(payload);
                setMessage('');
            },
            {
                optimisticData: [...messages, { ...payload, id: 45 }],
                populateCache: true,
                revalidate: true,
            }
        );
    };
    const handleKeyDownMessage: KeyboardEventHandler = ({ key }) => {
        if (key === ENTER_KEY && message) {
            sendMessage();
        }
    };

    const handleClickSendMessage: MouseEventHandler<HTMLButtonElement> = () => {
        sendMessage();
    };
    return (
        <HStack
            borderTop="1px"
            borderColor="gray.200"
            flex={{ base: 1, lg: 0 }}
            p={3}
            justifyContent="space-between"
        >
            <Input
                onChange={handleChangeMessage}
                onKeyDown={handleKeyDownMessage}
                placeholder="Aa"
                value={message}
            />
            <Button onClick={handleClickSendMessage} disabled={!message}>
                Send
            </Button>
        </HStack>
    );
};

export default ChatFooter;
