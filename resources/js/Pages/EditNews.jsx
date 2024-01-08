import { Head } from "@inertiajs/react";
import React from "react";
import Navbar from "@/Components/Navbar";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    console.log(props);

    const [title, setTitle] = useState(props.myNews.title);
    const [desc, setDesc] = useState(props.myNews.desc);
    const [category, setCategory] = useState(props.myNews.category);
    const [image, setImage] = useState(props.myNews.image);

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            desc,
            category,
            image,
        };

        Inertia.post("/news/update", data);
    };

    return (
        <div className="min-h-screen bg-neutral-800">
            <Head title="Update" />
            <Navbar user={props.auth.user} />
            <h2 className="font-semibold text-xl text-white-800 leading-tight p-4 ms-2">
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
                                onChange={(title) =>
                                    setTitle(title.target.value)
                                }
                                defaultValue={props.myNews.title}
                            />
                            <input
                                type="text"
                                placeholder="Kategori"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(category) =>
                                    setCategory(category.target.value)
                                }
                                defaultValue={props.myNews.category}
                            />
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(desc) => setDesc(desc.target.value)}
                                defaultValue={props.myNews.desc}
                            />
                            <input
                                type="text"
                                placeholder="Link Thumbnail"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(image) =>
                                    setImage(image.target.value)
                                }
                                defaultValue={props.myNews.image}
                            />
                            <button
                                className="btn btn-primary m-2"
                                onClick={() => handleSubmit()}
                            >
                                UPDATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
