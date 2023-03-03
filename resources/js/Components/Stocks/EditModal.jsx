import React from 'react';
import {
    Dialog,
    DialogTitle,
} from '@mui/material';
import { useForm, usePage } from "@inertiajs/react";
import Form from './Form';

/* Creating a mui dialog modal for editing rows */
export default function EditModal ({ open, onClose, targetStockData }) {
    const { data, setData, put, errors, clearErrors, reset } = useForm({
        category: targetStockData?.category || '',
        name: targetStockData?.name || '',
        quantity: targetStockData?.quantity || 0,
        unit_name: targetStockData?.unit_name || '',
        is_regular: targetStockData?.is_regular || '',
        regular_quantity: targetStockData?.regular_quantity || 0,
    });

    const handleSubmit = (e) => {
        //put your validation logic here
        e.preventDefault();
        put(route('stocks.update', {stock: targetStockData?.id}), {
            data: data,
            replace: true,
            preserveScroll: true,
            only: ['stocks', 'flash', 'errors'],
            onError: (errors) => console.log(errors),
            onSuccess: (page) => {
                confirm(`${page.props.flash.message}に成功しました。`),
                reset(),
                onClose()
            },
        });
    };

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">{ __('Edit Stock') }</DialogTitle>
            <Form
                data={data}
                errors={errors}
                clearErrors={clearErrors}
                reset={reset}
                handleSubmit={handleSubmit}
                onHandleChange={onHandleChange}     
                onClose={onClose}
            />
        </Dialog>
    );
};

