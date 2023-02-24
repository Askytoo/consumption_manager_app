import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Stock from "@/Components/Stocks/Index";
import { Head } from "@inertiajs/react";

export default function Index({ auth, stocks, categoryList, isRegularList }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Stocks" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <Stock
                    stocks={stocks}
                    categoryList={categoryList}
                    isRegularList={isRegularList}
                />
            </div>
        </AuthenticatedLayout>
    )
}
