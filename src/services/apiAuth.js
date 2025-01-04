import supabase from './supabase';

// функция входа пользователя в систему с помощью email и пароля
export async function login({ email, password }) {
    // взято из документации Supabase в разделе Authentication => User Management => Log in with Email/Password
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    // проверяем на наличие ошибки
    if (error) throw new Error(error.message);

    // возвращаем данные
    return data;
}
