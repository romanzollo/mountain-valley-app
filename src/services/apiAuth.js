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

// функция для проверки наличия пользователя в системе и авторизирован ли он
export async function getCurrentUser() {
    // получаем данные о текущем пользователе из Local Storage которые были сохранены при авторизации пользователя из Supabase (session)
    const { data: session } = await supabase.auth.getSession();

    // проверяем на наличие данных о текущем пользователе в Local Storage
    if (!session.session) return null;

    // извлекаем данные о текущем пользователе из Supabase
    const { data, error } = await supabase.auth.getUser();

    console.log(data);

    // проверяем на наличие ошибки
    if (error) throw new Error(error.message);

    // возвращаем данные (только user)
    return data?.user;
}
