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
export async function updateSetting(newSetting) {
    const { data, error } = await supabase
        .from('settings')
        .update(newSetting)
        // Существует только ОДНА строка настроек, и она имеет идентификатор = 1, поэтому это обновленная строка.
        .eq('id', 1)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be updated');
    }
    return data;
}
