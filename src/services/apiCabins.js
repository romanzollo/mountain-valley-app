import supabase from './supabase';
import { supabaseUrl } from './supabase';

// все функции автоматически создаются в документации Supabase
// откуда их просто можно скопировать
export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

// функция для создания/редактирования хижины
// вводим дополнительно id для возможности редактирования при наличии id
export async function createEditCabin(newCabin, id) {
    // проверяем есть ли картинка в объекте newCabin
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    // создаем случайное имя картинки(Math.random()) + убираем слэш в названии
    // чтобы supabase не создавал лишние папки в хранилище если в названии изображения есть слэш
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        ''
    );

    // если картинка уже есть, то берем путь изображения из объекта newCabin, если нет, то формируем новый путь
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    /* --- прием повторного использования одной функции для разных целей(редактирование/создание) в зависимости от входных данных(наличие id) --- */
    // 1. создаем/редактируем новую хижину в базу
    let query = supabase.from('cabins');

    // A) создаем (id нет)
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // передаем в базу название картинки новой хижины

    // B) редактируем (id есть)
    if (id) {
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
    }

    const { data, error } = await query.select().single(); // чтобы удалить новый элемент из массива в котором он будет находиться;

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be created');
    }

    // 2. загружаем картинку
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3. если что-то пошло не так, удаляем хижину из базы
    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);

        console.error(storageError);
        throw new Error(
            'Cabin could not be uploaded and the cabin was not created'
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
}
