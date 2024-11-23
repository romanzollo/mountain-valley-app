import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { createCabin } from '../../services/apiCabins';

const FormRow2 = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm() {
    // register - функция, которая регистрирует входные данные (фундаментальная функция React Hook Form)
    // reset - функция, которая очищает форму
    // getValues - функция, которая возвращает объект всех введенных в форму данных
    const { register, handleSubmit, reset, getValues, formState } = useForm(); // React Hook Form

    // получаем из объекта состояния формы formState объект ошибок из валидации
    const { errors } = formState;

    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // создаем мутацию для добавления newCabin (React Query)
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => createCabin(newCabin),
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('New cabin successfully created!');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });

            // очищаем форму
            reset();
        },
        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
    }

    // функция обработки ошибок для React Hook Form
    function onError(errors) {
        // console.log(errors);
    }

    return (
        // если будет ошибка валидации, то будет вызвана 2я функция onError,
        // если нет - 1я onSubmit
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
                    // регистрируем входные данные
                    {...register('discount', {
                        required: 'This field is required',
                        // собственная функция валидации которая возвращает true или false
                        validate: (value) =>
                            // проверяем, что значение меньше или равно регулярной цене
                            // value текущее значение инпута
                            // getValues() возвращает объект всех введенных в форму данных, regularPrice - соответствует id инпута
                            value >= getValues().regularPrice ||
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
                    disabled={isCreating}
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
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
