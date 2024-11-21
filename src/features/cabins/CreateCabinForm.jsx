import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabin } from '../../services/apiCabins';

const FormRow = styled.div`
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
    // React Hook Form
    // register - функция, которая регистрирует входные данные (фундаментальная функция React Hook Form)
    // reset - функция, которая очищает форму
    const { register, handleSubmit, reset } = useForm();

    function onSubmit(data) {
        mutate(data);
    }

    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // создаем мутацию для добавления newCabin (React Query)
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => createCabin(newCabin),
        onSuccess: () => {
            toast.success('New cabin successfully created!');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });

            // очищаем форму
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    type="text"
                    id="name"
                    // регистрируем входные данные
                    {...register('name')}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    // регистрируем входные данные
                    {...register('maxCapacity')}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input
                    type="number"
                    id="regularPrice"
                    // регистрируем входные данные
                    {...register('regularPrice')}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    // регистрируем входные данные
                    {...register('discount')}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    // регистрируем входные данные
                    {...register('description')}
                />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*" />
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
