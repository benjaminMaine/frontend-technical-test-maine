import type { User } from '../types/user';

// Default way to use a logged user
// Feel free to update the user ID for your tests
// or enhance it with better data source, or better user management
export const getLoggedUserId = (userCookie: string): User['id'] | null => {
    if (typeof userCookie !== 'string') {
        return null;
    }
    const user: User = JSON.parse(userCookie);
    return typeof user?.id === 'undefined' ? null : user.id;
};
