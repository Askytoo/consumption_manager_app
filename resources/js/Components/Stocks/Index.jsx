import React, { useMemo } from "react";
import MaterialReactTable from 'material-react-table';
export default function Stock ({ stocks }) {
        const columns = useMemo(
            () => [
                {
                    accessorKey: 'name',
                    header: 'Item Name' ,
                },
                {
                    accessorKey: 'quantity',
                    header: 'Quantity',
                },
            ],
            [],
        );

    return (
        <MaterialReactTable
            columns={columns}
            data={stocks}
            enablePagination={false}
            enableRowVirtualization
        />
    );
}

