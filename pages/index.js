import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage }) => {
	return (
		<Layout categories={categories}>
			<Seo seo={homepage.attributes.seo} />
			<div>
				<div>
					<h1 className="text-center text-3xl uppercase font-bold">
						{homepage.attributes.hero.title}
					</h1>
					<div class="container mx-auto my-5">
						<Articles articles={articles} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticProps() {
	// Run API calls in parallel
	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI("/articles", { populate: ["image", "category"] }),
		fetchAPI("/categories", { populate: "*" }),
		fetchAPI("/homepage", {
			populate: {
				hero: "*",
				seo: { populate: "*" },
			},
		}),
	]);

	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
		},
		revalidate: 1,
	};
}

export default Home;
