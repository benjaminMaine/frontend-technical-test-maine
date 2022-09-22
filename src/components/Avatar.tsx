import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import AvatarWEBP from '../assets/avatar.webp';

const WRAPPER_SIZE = '36px';

const AVATAR_SIZE = {
    height: 22,
    width: 22,
};

export const Avatar = () => {
    return (
        <Flex
            bg="red.400"
            alignItems="center"
            borderRadius="full"
            height={WRAPPER_SIZE}
            justifyContent="center"
            width={WRAPPER_SIZE}
        >
            <Text color="white" fontSize="xl">
                E
            </Text>
        </Flex>
    );
};
