import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Stock from "@/Components/Stocks/Table";
import { Head } from "@inertiajs/react";

export default function Index({ auth, stocks, categories, regularOptions }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Stocks" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <Stock
                    stocks={stocks}
                    categories={categories}
                    regularOptions={regularOptions}
                />
            </div>
        </AuthenticatedLayout>
    )
}
