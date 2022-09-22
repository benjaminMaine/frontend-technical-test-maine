import { ChakraProps, Stack, Text } from '@chakra-ui/react';

export const Chat = (props: ChakraProps) => {
    return (
        <Stack {...props} border="1px" borderColor="gray.400" borderRadius="lg" p={4}>
            <Text>Chat</Text>
        </Stack>
    );
};
