import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
    // получаем данные о текущем пользователе с помощью кастомного хука useUser
    // нам не нужно состояние загрузки, и мы можем сразу использовать пользовательские данные, поскольку знаем, что они уже загружены в этот момент
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useUser();

    // получаем функцию для обновления данных о пользователе с помощью кастомного хука useUpdateUser
    const { updateUser, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        // проверяем наличие имени
        if (!fullName) return;

        // если есть новое имя или новый аватар обновляем данные
        updateUser(
            { fullName, avatar },
            {
                onSuccess: () => {
                    // очищаем поля
                    // setFullName('');
                    setAvatar(null);
                    e.target.reset();
                },
            }
        );
    }

    // функция для возвращения к первоночальному имени и аватара в исходное состояние при нажатии на кнопку Cancel
    function handleCencel() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>

            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*" // файлы какого типа нужно прикрепить
                    onChange={(e) => setAvatar(e.target.files[0])} // files[0] - первый выбранный файл в массиве
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow>
                <Button
                    type="reset"
                    variation="secondary"
                    disabled={isUpdating}
                    onClick={handleCencel}
                >
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
