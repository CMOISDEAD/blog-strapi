import Moment from "react-moment";
import parse from "html-react-parser";
import Seo from "../../components/seo";
import Layout from "../../components/layout";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
	const imageUrl = getStrapiMedia(article.attributes.image);

	const headerStyle = {
		background: `url(${imageUrl}) center fixed`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	};

	const seo = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.image,
		article: true,
	};

	console.log(imageUrl);
	return (
		<Layout categories={categories.data}>
			<Seo seo={seo} />
			<div
				id="banner"
				className="w-full h-[80vh] flex flex-row justify-center content-center items-center"
				style={headerStyle}
			>
				<h1 className="text-8xl font-bold uppercase text-center text-white">
					{article.attributes.title}
				</h1>
			</div>
			<div className="container mx-auto my-5">
				<div>{parse(article.attributes.content)}</div>
				<hr className="my-5" />
				<div className="flex flex-row justify-start content-center items-center gap-4">
					<div>
						{article.attributes.author.data.attributes.picture && (
							<img
								src={getStrapiMedia(
									article.attributes.author.data.attributes.picture,
								)}
								alt={
									article.attributes.author.data.attributes.picture.data
										.attributes.alternativeText
								}
								style={{
									position: "static",
									borderRadius: "20%",
									height: 60,
								}}
							/>
						)}
					</div>
					<div>
						<p className="font-bold">
							By {article.attributes.author.data.attributes.name}
						</p>
						<p className="text-sm text-gray-500">
							<Moment format="MMM Do YYYY">
								{article.attributes.published_at}
							</Moment>
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

	return {
		paths: articlesRes.data.map((article) => ({
			params: {
				slug: article.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const articlesRes = await fetchAPI("/articles", {
		filters: {
			slug: params.slug,
		},
		populate: ["image", "category", "author.picture"],
	});
	const categoriesRes = await fetchAPI("/categories");

	return {
		props: { article: articlesRes.data[0], categories: categoriesRes },
		revalidate: 1,
	};
}

export default Article;
