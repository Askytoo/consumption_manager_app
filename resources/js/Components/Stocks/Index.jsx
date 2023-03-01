import React, { useCallback, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_JA } from 'material-react-table/locales/ja';
import { router } from '@inertiajs/react';
// import Form from '@/Components/Stocks/Form';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import { useForm, usePage } from "@inertiajs/react";

export default function Stock ({ stocks }) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => stocks);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            router.patch(route('stocks.update', {stock: row.getValue('id')}), values);
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = (row) => {
        //send api delete request here, then refetch or update local table data for re-render
        router.visit(route('stocks.destroy', {stock: row.getValue('id')}), {
            method: 'delete',
            replace: true,
            preserveState: true,
            preserveScroll: true,
            only: ['stocks', 'flash'],
            onBefore: () => confirm(`${row.getValue('name')}を削除しますか？`),
            onSuccess: (page) => confirm(`${page.props.flash.message}に成功しました。`),
        });
    };

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
                                ? validateAge(+event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                enableGlobalFilter: false,
            },
            {
                accessorKey: 'category',
                header: 'カテゴリー' ,
                size: '100',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    required: true,
                    type: 'string',
                }),
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'name',
                header: '商品名' ,
                size: '120',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    required: true,
                    type: 'string',
                }),
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'quantity',
                header: '数量',
                size: '50',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    required: true,
                    type: 'number',
                }),
                muiTableHeadCellProps: {
                    align: 'right',
                },
                muiTableBodyCellProps: {
                    align: 'right',
                },
            },
            {
                accessorKey: 'unit_name',
                header: '単位' ,
                size: '50',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
            },
            {
                accessorKey: 'is_regular',
                header: '常備品' ,
                muiTableBodyCellEditTextFieldProps: {
                    required: true,
                    select: true, //change to select for a dropdown
                    /* children: isRegularList.map((isRegular) => (
                        <MenuItem key={isRegular} value={isRegular}>
                            {isRegular}
                        </MenuItem>
                    )), */
                    children: 
                    <>
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                    </>
                    ,
                },
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
            {
                accessorKey: 'reglar_quantity',
                header: '常備数量' ,
                muiTableBodyCellEditTextFieldProps: {
                    required: true,
                    type: 'number',
                },
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
        ],
        [getCommonEditTextFieldProps],
    );


    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={stocks}
                enablePagination={false}
                enableRowVirtualization
                /* Grooping */
                enableGrouping
                enableColumnDragging={false}
                initialState={{
                    grouping: ['category'],
                    columnVisibility: {id: false, is_regular: false, reglar_quantity: false},
                    density: 'compact',
                    sorting: [{ id: 'category', desc: false }],
                }}
                /* Top Toolbar */
                enableColumnActions={false}
                enableColumnFilters={false}
                enableHiding={false}
                positionToolbarAlertBanner='none'
                /* Editing */
                enableEditing
                editingMode="modal"
                /* Bottom Toolbar */
                renderBottomToolbarCustomActions={() => (
                    <Typography sx={{ fontStyle: 'italic', p: '0 1rem' }} variant="body2">
                        Double-Click a Cell to Edit
                    </Typography>
                )}
                /* Stripe */
                muiTableBodyProps={{
                    sx: {
                        //stripe the rows, make odd rows a darker color
                        '& tr:nth-of-type(odd)': {
                            backgroundColor: '#f5f5f5',
                        },
                    },
                }}
                muiTableContainerProps={{ sx: { maxHeight: 700 } }}
                localization={MRT_Localization_JA}
                /* CRUD Example */
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 80,
                    },
                }}
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        color="primary"
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        { __('Create New Stock') }
                    </Button>
                )}
            />
            <CreateNewStockModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </>
    );
};

/* Creating a mui dialog modal for creating new rows */
export const CreateNewStockModal = ({ open, onClose }) => {
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

    const { data, setData, post, errors, clearErrors, reset } = useForm({
        category: '食料品',
        name: '',
        quantity: '',
        unit_name: '',
        is_regular: '未設定',
        regular_quantity: '0',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    };

    const categories = usePage().props.categories;
    const regularOptions = usePage().props.regularOptions;


    /* Dialog */
    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">{ __('Create New Stock') }</DialogTitle>
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

                        <InputError message={errors.title} className="mt-2" />
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
                        <Button onClick={() => {onClose(); reset(); clearErrors()}}>{ __('Cancel') }</Button>
                        <Button color="primary" type="submit" variant="contained">
                            { __('Save') }
                        </Button>
                    </DialogActions>
                </form>
        </Dialog>
    );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age) => age >= 18 && age <= 50;

