import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
    // React Hook Form
    const { register, handleSubmit, formState, getValues, reset } = useForm(); // register - функция, которая регистрирует входные данные (фундаментальная функция React Hook Form)
    const { errors } = formState; // объект ошибок

    // получаем функцию для обновления пароля пользователя с помощью кастомного хука useUpdateUser
    const { updateUser, isUpdating } = useUpdateUser();

    function onSubmit({ password }) {
        // вызываем функцию обновления пароля
        updateUser({ password }, { onSuccess: reset() }); // onSuccess - функция, которая будет вызвана после успешного обновления пароля (чтобы очистить форму)
    }

    return (
        /* handleSubmit - функция, которая обрабатывает отправку формы (React Hook Form)  */
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/* error - объект с ошибками (React Hook Form) для отображения валидационных сообщений */}
            <FormRow
                label="New password (min 8 chars)"
                // React Hook Form
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    // React Hook Form
                    {...register('password', {
                        required: 'This field is required',
                        // minLength - встроенная опция в React Hook Form для настройки валидации (минимальная длина пароля)
                        minLength: {
                            value: 8,
                            message: 'Password needs a minimum of 8 characters', // сообщение в случае ошибки
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Confirm password"
                // React Hook Form
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    // React Hook Form
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        // проверяем совпадение паролей через валидационную функцию
                        // getValues() возвращает объект всех введенных в форму данных
                        validate: (value) =>
                            getValues().password === value ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow>
                {/* onClick={reset} - отчищаем валидационные сообщения об ошибках */}
                <Button onClick={reset} type="reset" $variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update password</Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
