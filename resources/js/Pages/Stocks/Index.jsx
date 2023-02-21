import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Stock from "@/Components/Stocks/Index";
import { Head } from "@inertiajs/react";

export default function Index({ auth, stocks }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Stocks" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {stocks.map(stock =>
                        <Stock key={stock.id} stock={stock} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
