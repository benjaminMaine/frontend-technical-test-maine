import { Avatar, chakra, HStack } from '@chakra-ui/react';
import { UseDisclosureProps } from '@chakra-ui/hooks';
import { useUserIdContext } from '../../../contexts/useUserIdContext';
import Logo from '../../../assets/lbc-logo.webp';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

type HeaderProps = Pick<UseDisclosureProps, 'onOpen'>;
const Header = ({ onOpen }: HeaderProps) => {
    const { user } = useUserIdContext();

    return (
        <chakra.header
            borderBottom="1px"
            borderColor="gray.light"
            display="flex"
            justifyContent="space-between"
            my={4}
            px={4}
            pb={2}
        >
            <Image src={Logo} alt="Leboncoin Frontend Team" width={160} height={50} />
            <HStack>
                {user && <LogoutButton />}
                <Avatar
                    cursor="pointer"
                    data-testid="header-avatar"
                    onClick={onOpen}
                    name={user?.nickname}
                />
            </HStack>
        </chakra.header>
    );
};

export default Header;
