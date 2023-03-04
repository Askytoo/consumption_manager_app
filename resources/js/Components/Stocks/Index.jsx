import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_JA } from 'material-react-table/locales/ja';
import { router } from '@inertiajs/react';
// import Form from '@/Components/Stocks/Form';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

export default function Stock ({ stocks }) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const handleEditRow = (targetStockData) => {
        setEditingData(targetStockData);
        setEditModalOpen(true);
    }

    const handleDeleteRow = (targetStockData) => {
        //send api delete request here, then refetch or update local table data for re-render
        router.visit(route('stocks.destroy', {stock: targetStockData.id}), {
            method: 'delete',
            replace: true,
            preserveState: true,
            preserveScroll: true,
            only: ['stocks', 'flash'],
            onBefore: () => confirm(`${targetStockData.name}を削除しますか？`),
            onSuccess: (page) => confirm(`${page.props.flash.message}に成功しました。`),
        });
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'category',
                header: 'カテゴリー' ,
                size: '100',
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
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
            },
        ],
        [],
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
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => handleEditRow(row.original)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row.original)}>
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
            <CreateModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
            <EditModal
                key={JSON.stringify(editingData)}
                open={editModalOpen}
                targetStockData={editingData}
                onClose={() => setEditModalOpen(false)}
            />
        </>
    );
};



