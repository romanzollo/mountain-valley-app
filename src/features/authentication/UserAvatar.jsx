import styled from 'styled-components';

import { useUser } from './useUser';

// --- styled components --- //
const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

// --- components --- //
function UserAvatar() {
    // получаем данные о пользователе через кастомный хук
    const { user } = useUser();

    // деструктуризируем данные пользователя на имя и аватар
    const { fullName, avatar } = user.user_metadata; // структуру user - можно увидеть через React Query Devtools

    return (
        <StyledUserAvatar>
            {/* если есть аватар, то выводим его если нет, то заготовленную
            картинку 'default-user.jpg' - которая лежит в папке public */}
            <Avatar
                src={avatar || 'default-user.jpg'}
                alt={`Avatar of ${fullName}`}
            />
            <span>{fullName}</span>
        </StyledUserAvatar>
    );
}

export default UserAvatar;
