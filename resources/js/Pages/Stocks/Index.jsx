import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

export default function Index({ auth }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Stocks" />

            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {stocks.map(stock =>
                    <Stock key={stock.id} stock={stock} />
                )}
            </div>
        </AuthenticatedLayout>
    )
}
