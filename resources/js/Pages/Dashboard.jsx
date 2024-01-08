import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard({ auth }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = () => {
        const data = {
            title,
            desc,
            category,
            image,
        };

        Inertia.post("/news", data);

        setTitle("");
        setDesc("");
        setCategory("");
        setImage("");
    };

    useEffect(() => {
        if (!auth.myNews) {
            Inertia.get("/news");
        }
        console.log(auth);
        return;
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {auth.message !== null && (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{auth.message}</span>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Judul"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(title) =>
                                    setTitle(title.target.value)
                                }
                                value={title}
                            />
                            <input
                                type="text"
                                placeholder="Kategori"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(category) =>
                                    setCategory(category.target.value)
                                }
                                value={category}
                            />
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(desc) => setDesc(desc.target.value)}
                                value={desc}
                            />
                            <input
                                type="text"
                                placeholder="Link Thumbnail"
                                className="input input-bordered w-full m-2 bg-white shadow"
                                onChange={(image) =>
                                    setImage(image.target.value)
                                }
                                value={image}
                            />
                            <button
                                className="btn btn-primary m-2"
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    {auth.myNews &&
                        auth.myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full lg:w-96 bg-white shadow-xl pt-2 my-5"
                                >
                                    <figure>
                                        <img src={news.image} />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                        </h2>
                                        <p>{news.desc}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">
                                                {news.category}
                                            </div>
                                            <div className="badge badge-outline">
                                                {news.author}
                                            </div>
                                        </div>
                                        <div className="card-actions justify-aroundly">
                                            <a className="btn btn-primary">
                                                <Link
                                                    href={route("edit.news")}
                                                    method="get"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    Edit
                                                </Link>
                                            </a>
                                            <a className="btn btn-danger">
                                                <Link
                                                    href={route("delete.news")}
                                                    method="post"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                >
                                                    Delete
                                                </Link>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
