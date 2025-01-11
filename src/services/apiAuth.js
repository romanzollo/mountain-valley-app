import supabase, { supabaseUrl } from './supabase';

// функция регистрации нового пользователя
export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // необязательные опции, для возможности добавить некоторые дополнительные данные о пользователе
        options: {
            // передаем данные о пользователе которые будут сохранены в Supabase
            data: {
                fullName,
                avatar: '',
            },
        },
    });

    // проверяем на наличие ошибки
    if (error) throw new Error(error.message);

    // возвращаем данные
    return data;
}

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

    // проверяем на наличие ошибки
    if (error) throw new Error(error.message);

    // возвращаем данные (только user)
    return data?.user;
}

// функция выхода из системы
export async function logout() {
    const { error } = await supabase.auth.signOut(); // сохраняем объект с ошибками - error, чтобы в дальнейшем использовать этот объект или отобразить ошибку

    // если есть ошибка выводим ее
    if (error) throw new Error(error.message);
}

// функция обновления данных о текущем пользователе
export async function updateCurrentUser({ fullName, password, avatar }) {
    // 1. обновляем пароль или имя пользователя (пароль и имя одновременно мы не обновляем т.к. формы для обновления пароля и имени разные)

    // создаем объект с данными
    let updateData;

    // формируем объект updateData в соответствии с получаемыми данными
    // только одно из этих двух условий может быть true одновременно
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } }; // т.к. в функции signup, при регистрации нового пользователя мы указали что: data: { fullName, avatar: '' }

    // узнаем какой пользователь вошел в систему и обновляем данные
    const { data, error } = await supabase.auth.updateUser(updateData); // error - потенциальные ошибки

    // если есть ошибка выводим ее
    if (error) throw new Error(error.message);

    // если нет аватара, то возвращаем данные (дальше код не выполнится)
    if (!avatar) return data;

    // 2. формируем и загружаем новый аватар
    const fileName = `avatar-${data.user.id}-${Math.random()}`; // создаем уникальное имя файла

    // загружаем фаил в хранилище Supabase (Storage => Avatars)
    // (так же не забываем изменить политику доступа, "для только аутентифицированных пользователей", в Supabase )
    const { error: storageError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatar);

    // если есть ошибка выводим ее
    if (storageError) throw new Error(storageError.message);

    // 3. обновляем аватар пользователя
    const { data: updateUser, error: updateError } =
        await supabase.auth.updateUser({
            // структуру данных data мы задавали в функции signup
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`, // путем обновления URL адреса изображения аватара на клиенте
            },
        });

    // если есть ошибка выводим ее
    if (updateError) throw new Error(updateError.message);

    // если нет ошибок возвращаем данные обновленного пользователя
    return updateUser;
}
