const components = {
    Button: {
        baseStyle: {
            backgroundColor: 'blue.main',
            color: 'white',
            _hover: { backgroundColor: 'blue.dark', shadow: '1', _disabled: { background: '' } },
            _disabled: {
                opacity: 0.4,
                cursor: 'default',
            },
        },
        defaultProps: {
            variant: 'main',
        },
    },
};

export default components;
