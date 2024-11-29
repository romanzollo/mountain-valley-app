import supabase from './supabase';

export async function getSettings() {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }
    return data;
}

// Мы ожидаем объект newSetting, который выглядит как  {setting: newValue}
// newSetting - может быть любой строкой  инпута который нужно обновить (например 'email')
// но может быть и объектом
export async function updateSetting(newSetting) {
    const { data, error } = await supabase
        .from('settings')
        .update(newSetting)
        // Существует только ОДНА строка настроек, и она имеет идентификатор = 1, поэтому обновляем толькоs ее
        .eq('id', 1)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be updated');
    }
    return data;
}
