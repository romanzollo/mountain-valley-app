import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
    const { id: updateId, ...updateValues } = cabinToUpdate;

    // используем кастомный хук для создания новой хижины
    const { isCreating, createCabin } = useCreateCabin();
    // используем кастомный хук для редактирования хижины
    const { isUpdating, updateCabin } = useUpdateCabin();
    // для удобства объединяем значение isCreating и isUpdating в одну переменную
    const isWorking = isCreating || isUpdating;

    // определяем, являемся ли мы в режиме редактирования
    const isUpdateSession = Boolean(updateId);

    // register - функция, которая регистрирует входные данные (фундаментальная функция React Hook Form)
    // reset - функция, которая очищает форму
    // getValues - функция, которая возвращает объект всех введенных в форму данных
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        // если мы в режиме редактирования, то устанавливаем значения по умолчанию в форму из updateValues
        defaultValues: isUpdateSession ? updateValues : {},
    }); // React Hook Form

    // получаем из объекта состояния формы formState объект ошибок из валидации
    const { errors } = formState;

    function onSubmit(data) {
        // если картинка уже есть в объекте в виде строки, то берем ее, если нет, то берем первую картинку
        const image =
            typeof data.image === 'string' ? data.image : data.image[0];

        // если мы в режиме редактирования, то вызываем функцию редактирования
        if (isUpdateSession)
            updateCabin(
                { newCabinData: { ...data, image }, id: updateId },
                {
                    onSuccess: (data) => {
                        // очищаем форму
                        reset();

                        // вызываем функцию закрытия модального окна + optional chaining (чтобы избежать ошибки при отсутствии onCloseModal)
                        onCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                { ...data, image: image },
                {
                    onSuccess: (data) => {
                        // очищаем форму
                        reset();

                        // вызываем функцию закрытия модального окна + optional chaining (чтобы избежать ошибки при отсутствии onCloseModal)
                        onCloseModal?.();
                    },
                }
            );
    }

    // функция обработки ошибок для React Hook Form
    function onError(errors) {
        // console.log(errors);
    }

    return (
        // если будет ошибка валидации, то будет вызвана 2я функция onError,
        // если нет - 1я onSubmit
        // если onCloseModal есть, то форма будет использоваться в модальном окне (type="modal")
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? 'modal' : 'regular'}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    // регистрируем входные данные
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    // регистрируем входные данные
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        // минимальное значение
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1 person', // сообщение об ошибке
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    // регистрируем входные данные
                    {...register('regularPrice', {
                        required: 'This field is required',
                        // минимальное значение
                        min: {
                            value: 1,
                            message: 'Price should be at least 1', // сообщение об ошибке
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isWorking}
                    // регистрируем входные данные
                    {...register('discount', {
                        required: 'This field is required',
                        // собственная функция валидации которая возвращает true или false
                        validate: (value) =>
                            // проверяем, что значение меньше или равно регулярной цене
                            // value текущее значение инпута
                            // getValues() возвращает объект всех введенных в форму данных, regularPrice - соответствует id инпута
                            value <= getValues().regularPrice ||
                            'Discount should be less than regular price',
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    // регистрируем входные данные
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    // регистрируем входные данные
                    {...register('image', {
                        // если мы в режиме редактирования, то поле не обязательное
                        required: isUpdateSession
                            ? false
                            : 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    // чтобы избежать ошибки, если onCloseModal не передан используем optional chaining
                    onClick={() => onCloseModal?.()}
                    variation="secondary"
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isUpdateSession ? 'Update cabin' : 'Create a new cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

CreateCabinForm.propTypes = {
    cabinToUpdate: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        maxCapacity: PropTypes.number,
        regularPrice: PropTypes.number,
        discount: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
    }),
    // onCloseModal: PropTypes.func.isRequired,
};
