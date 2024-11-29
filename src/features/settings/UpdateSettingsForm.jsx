import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
    // используем кастомный хук для получения данных о настройках
    const {
        isLoading,
        settings: {
            // данные из таблицы settings в supabase
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {}, // чтобы избежать ошибки, если settings не загрузились
    } = useSettings();

    // используем кастомный хук для обновления настроек
    const { isUpdating, updateSetting } = useUpdateSetting();

    if (isLoading) return <Spinner />;

    function handleUpdate(e, fieldName) {
        const { value } = e.target;

        if (!value) return;

        updateSetting({ [fieldName]: value });
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleUpdate(e, 'minBookingLength')}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
                    disabled={isUpdating}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
                    disabled={isUpdating}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
