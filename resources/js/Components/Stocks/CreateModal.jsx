import React, { useCallback, useMemo, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
} from '@mui/material';
// import Form from '@/Components/Stocks/Form';
import { useForm } from "@inertiajs/react";
import Form from './Form';

export default function CreateModal  ({ open, onClose }) {
    const { data, setData, post, errors, clearErrors, reset } = useForm({
        category: '食料品',
        name: '',
        quantity: '',
        unit_name: '',
        is_regular: '未設定',
        regular_quantity: '0',
    });

    const handleSubmit = (e) => {
        //put your validation logic here
        e.preventDefault();
        post(route('stocks.store'), {
            data: data,
            replace: true,
            preserveScroll: true,
            only: ['stocks', 'flash', 'errors'],
            onSuccess: (page) => {
                confirm(`${page.props.flash.message}に成功しました。`),
                reset(),
                onClose()
            }
        });
    };

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    };

    /* Dialog */
    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">{ __('Create New Stock') }</DialogTitle>
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

