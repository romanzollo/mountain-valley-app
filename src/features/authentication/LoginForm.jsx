import { useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';

import { useLogin } from './useLogin';

// --- components --- //
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // используем кастомный хук для логина
    const { login, isLoading } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();

        // проверяем наличие email и пароля
        if (!email || !password) return;

        // вызываем функцию логина
        login(
            { email, password },
            // добавляем опции
            {
                // onSettled - встроенный в React Query обработчик
                onSettled: () => {
                    // очищаем поля email и пароля
                    setEmail('');
                    setPassword('');
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // автозаполнение - делает эту форму более удобной
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>

            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    // автозаполнение - делает эту форму более удобной
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </FormRowVertical>

            <FormRowVertical>
                <Button size="large" disabled={isLoading}>
                    {/* в зависимости от состояния isLoading выводим либо текст, либо маленький спиннер */}
                    {!isLoading ? 'Login' : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
