const VAOVAO_BASE_URL = process.env.VAOVAO_BASE_URL;
const FB_GRAPH_API = process.env.FB_GRAPH_API;
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const fetchNews = async () => {
    const res = await fetch(VAOVAO_BASE_URL);
    const news = await res.json();
    return news;
}
const fetchDetail = async (article) => {
    const url = encodeURI(`${VAOVAO_BASE_URL}/detail?link=${article.link}&journal_id=${article.journalId}`);
    const res = await fetch(url);
    const detail = await res.json();
    return detail;
}
const publishToFacebook = async (article, articleDetail) => {

    let content = "🔴📢 " + article.title + "👇 \n\n\n";
    const body = articleDetail.content.reduce((acc, curr) => {
        return acc + curr + "\n\n";
    }, "");
    content += body;
    content += "source: " + article.link;

    const res = await fetch(`${FB_GRAPH_API}/${FB_PAGE_ID}/photos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: content,
            url: articleDetail.img,
            access_token: FB_ACCESS_TOKEN
        })
    });

    return res.json();
}
const publish = async (req, res) => {
    const id = req.params.id;
    const news = await fetchNews();
    if (!news[id]) {
        res.status(404).send({ message: "Article not found" });
        return
    }
    const article = news[id];
    const detail = await fetchDetail(article);
    
    console.log('detail', detail);
    const fbResponse = await publishToFacebook(article, detail);
    res.send(fbResponse);
}
exports.publish = publish;