import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    // React Hook Form
    const { register, handleSubmit, formState, getValues } = useForm(); // register - функция, которая регистрирует входные данные (фундаментальная функция React Hook Form)
    const { errors } = formState; // объект ошибок

    function onSubmit(data) {
        console.log(data);
    }

    return (
        /* handleSubmit - функция, которая обрабатывает отправку формы (React Hook Form)  */
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/* error - объект с ошибками (React Hook Form) для отображения валидационных сообщений */}
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    // React Hook Form
                    {...register('fullName', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    // React Hook Form
                    {...register('email', {
                        required: 'This field is required',
                        // pattern - встроенная опция в React Hook Form для настройки валидации
                        pattern: {
                            value: /\S+@\S+\.\S+/, // проверяем наличие правильности ввода email адреса с помощью регулярного выражения
                            message: 'Please provide a valid email address', // сообщение в случае ошибки
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: 'This field is required',
                        // minLength - встроенная опция в React Hook Form для настройки валидации (минимальная длина пароля)
                        minLength: {
                            value: 8,
                            message:
                                'Password needs to be at least 8 characters long', // сообщение в случае ошибки
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        // проверяем совпадение паролей через валидационную функцию
                        // getValues() возвращает объект всех введенных в форму данных
                        validate: (value) =>
                            value === getValues().password ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type — это атрибут HTML! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
