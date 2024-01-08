import { Head } from "@inertiajs/react";
import React from "react";
import Navbar from "@/Components/Navbar";
import NewsList from "@/Components/Homepage/NewsList";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-neutral-800">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="flex justify-center items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch g-4 p-4">
                <NewsList news={props.news.data} />
            </div>
            <div className="flex justify-center items-center text-white p-5">
                <Paginator meta={props.news.meta} />
            </div>
        </div>
    );
}
