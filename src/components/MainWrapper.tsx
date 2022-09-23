import { PropsWithChildren } from 'react';
import { chakra } from '@chakra-ui/react';

const MainWrapper = ({ children, ...rest }: PropsWithChildren & { className: string }) => {
    return (
        <chakra.main display="flex" flex={1} py={8} px={4} overflow="hidden" {...rest}>
            {children}
        </chakra.main>
    );
};

export default MainWrapper;
