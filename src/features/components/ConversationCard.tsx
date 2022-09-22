import { ImageProps } from 'next/image';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from '../../components/Avatar';

type ConversationCardProps = {
    avatar: Omit<ImageProps, 'height' | 'width'>;
    firstName?: string;
    phoneNumber: string;
    lastMessageTimestamp: number;
};
export const ConversationCard = ({
    avatar,
    lastMessageTimestamp,
    phoneNumber,
}: ConversationCardProps) => {
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
            <Avatar />
            <Stack>
                <Text>{phoneNumber}</Text>
                <Text>{lastMessageTimestamp}</Text>
            </Stack>
        </HStack>
    );
};
