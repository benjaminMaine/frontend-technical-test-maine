import { HStack, Stack, Text } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/Fi';

type ChatHeaderProps = {
    title: string;
};
const ChatHeader = ({ title }: ChatHeaderProps) => {
    return (
        <HStack
            bg={{ base: 'inherit', lg: 'gray.200' }}
            p={3}
            justifyContent="space-between"
            spacing={{ base: 4, lg: null }}
        >
            <Text lineHeight={10}>{title}</Text>
            <HStack>
                <FiSettings />
            </HStack>
        </HStack>
    );
};

export default ChatHeader;
