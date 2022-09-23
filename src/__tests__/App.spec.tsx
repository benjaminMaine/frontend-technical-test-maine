import { render, screen } from '@testing-library/react';
import App from '../pages';
const mockedUsers = [
    {
        id: 1,
        nickname: 'Thibaut',
        token: 'xxxx',
    },
    {
        id: 2,
        nickname: 'Jeremie',
        token: 'xxxx',
    },
    {
        id: 3,
        nickname: 'Patrick',
        token: 'xxxx',
    },
];
describe('App', () => {
    it('1) should render ask user to sign in if no user is found in cookies', () => {
        render(<App fallback={{ userId: null, users: mockedUsers }} />);
        expect(screen.getByText(/Please sign in/)).toBeInTheDocument();
    });
});
