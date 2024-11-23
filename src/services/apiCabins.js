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

export async function createCabin(newCabin) {
    // создаем случайное имя картинки(Math.random()) + убираем слэш в названии
    // чтобы supabase не создавал лишние папки в хранилище если в названии изображения есть слэш
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        '/',
        ''
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. добавляем новую хижину в базу
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }]) // передаем в базу название картинки новой хижины
        .select();

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
