import React from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    Stack,
} from '@mui/material';
// import Form from '@/Components/Stocks/Form';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/react';

export default function Form ({ data, errors, clearErrors, reset, handleSubmit, onHandleChange, onClose }) {
    const categories = usePage().props.categories;
    const regularOptions = usePage().props.regularOptions;

    return(
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <Stack
                    sx={{
                        width: '100%',
                        minWidth: { xs: '300px', sm: '360px', md: '400px' },
                        gap: '1.5rem',
                    }}
                >
                <div>
                    <InputLabel forInput="category" value={ __('Category') } />

                    <SelectInput
                        id="category"
                        name="category"
                        value={data.category}
                        className="mt-1 block w-full"
                        autoComplete="category"
                        handleChange={onHandleChange}
                        options={categories}
                        required
                        />

                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div>
                    <InputLabel forInput="name" value={ __('Stock Name') } />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                        />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel forInput="quantity" value={ __('Quantity') } />

                    <TextInput
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={data.quantity}
                        className="mt-1 block w-full"
                        autoComplete="quantity"
                        handleChange={onHandleChange}
                        required
                        />

                    <InputError message={errors.quantity} className="mt-2" />
                </div>

                <div>
                    <InputLabel forInput="unit_name" value={ __('Unit Name') } />

                    <TextInput
                        id="unit_name"
                        type="text"
                        name="unit_name"
                        value={data.unit_name}
                        className="mt-1 block w-full"
                        autoComplete="unit_name"
                        handleChange={onHandleChange}
                        required
                        />

                    <InputError message={errors.unit_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel forInput="is_regular" value={ __('Is Regular') } />

                    <SelectInput
                        id="is_regular"
                        name="is_regular"
                        value={data.is_regular}
                        className="mt-1 block w-full"
                        autoComplete="is_regular"
                        handleChange={onHandleChange}
                        options={regularOptions}
                        required
                        />

                    <InputError message={errors.is_regular} className="mt-2" />
                </div>

                <div>
                    <InputLabel forInput="regular_quantity" value={ __('Regular Quantity') } />

                    <TextInput
                        id="regular_quantity"
                        type="number"
                        name="regular_quantity"
                        value={data.regular_quantity}
                        className="mt-1 block w-full"
                        autoComplete="regular_quantity"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.regular_quantity} className="mt-2" />
                </div>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={() => {onClose(); reset(); clearErrors()}}>
                    { __('Cancel') }
                </Button>
                <Button color="primary" type="submit" variant="contained">
                    { __('Save') }
                </Button>
            </DialogActions>
        </form>
    );
};
