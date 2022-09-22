import { Flex, Text } from '@chakra-ui/react';
import { Message } from '../../../types/message';

type ChatMessageProps = {
    isFromSender: boolean;
    message: Message;
};
const ChatMessage = ({ isFromSender, message }: ChatMessageProps) => {
    return (
        <Flex
            justifyContent={isFromSender ? 'end' : 'start'}
            pr={isFromSender ? 'auto' : 10}
            pl={isFromSender ? 10 : 'auto'}
        >
            <Text
                bg={isFromSender ? 'blue.main' : 'orange.main'}
                borderRadius="2xl"
                color="white"
                p={3}
                w="fit-content"
            >
                {message.body}
            </Text>
        </Flex>
    );
};

export default ChatMessage;
