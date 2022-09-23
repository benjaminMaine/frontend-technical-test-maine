import { Button } from '@chakra-ui/react';
import { useUserIdContext } from '../../../contexts/useUserIdContext';

const Logout = () => {
    const { logout } = useUserIdContext();
    return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
