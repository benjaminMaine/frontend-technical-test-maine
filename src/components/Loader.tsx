import { Center, Spinner } from '@chakra-ui/react';
import { ThemingProps } from '@chakra-ui/styled-system';

export const Loader = (props: ThemingProps<'Spinner'>) => (
    <Center flex={1}>
        <Spinner {...props} />
    </Center>
);
