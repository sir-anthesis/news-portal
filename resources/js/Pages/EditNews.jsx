import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title);
    const [desc, setDesc] = useState(props.myNews.desc);
    const [category, setCategory] = useState(props.myNews.category);
    const [image, setImage] = useState(null);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("id", props.myNews.id);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("category", category);
        if (image) {
            formData.append("image", image);
        }

        Inertia.post("/news/update", formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Update News" />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight p-4 ms-2">
                Edit Berita Saya
            </h2>
            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <input
                                type="text"
                                placeholder="Judul"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                            <input
                                type="text"
                                placeholder="Kategori"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            />
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                            />
                            <input
                                type="file"
                                className="input-bordered w-full m-2 p-4 bg-white shadow"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <p className="m-4 text-sm text-gray-600">
                                Current Image:{" "}
                                <a
                                    href={props.myNews.image}
                                    className="text-blue-500 underline"
                                    target="_blank"
                                >
                                    View
                                </a>
                            </p>
                            <button
                                className="btn btn-primary m-2"
                                onClick={handleSubmit}
                            >
                                UPDATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
