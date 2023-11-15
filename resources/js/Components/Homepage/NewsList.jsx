const isNews = (news) => {
    return news.map((data, i) => {
        return (
            <div
                key={i}
                className="card w-full lg:w-96 bg-base-100 shadow-xl m-5 pt-2"
            >
                <figure>
                    <img src={data.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{data.desc}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">
                            {data.category}
                        </div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
        );
    });
};

const noNews = () => {
    return (
        <div className="text-white">
            <h1>BERITA SEDANG KOSONG</h1>
        </div>
    );
};

const NewsList = ({ news }) => {
    return !news ? noNews() : isNews(news);
};

export default NewsList;
