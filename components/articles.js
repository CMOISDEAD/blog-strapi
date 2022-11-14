import React from "react";
import Card from "./card";

const Articles = ({ articles }) => {
	return (
		<div className="grid grid-cols-2 grid-flow-row gap-4">
			<div>
				{articles.map((article, _i) => {
					return (
						<Card
							article={article}
							key={`article__left__${article.attributes.slug}`}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Articles;
