import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Articles from "../../components/articles";

import { fetchAPI } from "../../lib/api";

const Category = ({ category, categories }) => {
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} articles`,
	};

	const isEmpty = category.attributes.articles.data.length != 0;

	return (
		<Layout categories={categories.data}>
			<Seo seo={seo} />
			<div className="container mx-auto">
				<div class="text-sm text-gray-500 italic">Category:</div>
				<h1 className="text-3xl font-bold capitalize">
					{category.attributes.name}
				</h1>
				{isEmpty ? (
					<div className="content my-8">
						<Articles articles={category.attributes.articles.data} />
					</div>
				) : (
					<div class="flex justify-center content-center items-center h-[60vh] w-full">
						<p className="text-5xl font-bold uppercase">Nothing here...</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });

	return {
		paths: categoriesRes.data.map((category) => ({
			params: {
				slug: category.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const matchingCategories = await fetchAPI("/categories", {
		filters: { slug: params.slug },
		populate: {
			articles: {
				populate: "*",
			},
		},
	});
	const allCategories = await fetchAPI("/categories");

	return {
		props: {
			category: matchingCategories.data[0],
			categories: allCategories,
		},
		revalidate: 1,
	};
}

export default Category;
