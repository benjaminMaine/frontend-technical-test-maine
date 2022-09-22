import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import { ComponentStyleConfig } from '@chakra-ui/react';
import components from './components';

const theme = extendTheme({
    colors,
    // ...components,
    components,
});

export default theme;
