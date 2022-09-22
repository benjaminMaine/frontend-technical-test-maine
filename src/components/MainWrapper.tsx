import { chakra } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const MainWrapper = ({ children, ...rest }: PropsWithChildren & { className: string }) => {
    return (
        <chakra.main display="flex" flex={1} py={8} px={4} {...rest}>
            {children}
        </chakra.main>
    );
};

export default MainWrapper;
