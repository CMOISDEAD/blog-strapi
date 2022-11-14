import React from "react";
import Link from "next/link";
import NextImage from "./image";

const Card = ({ article }) => {
	return (
		<Link href={`/article/${article.attributes.slug}`}>
			<div className="group border border-gray-300 p-1 rounded-sm w-4/6 hover:border-gray-500">
				<div className="content">
					<div className="border-b border-gray-300 group-hover:border-gray-500">
						<NextImage image={article.attributes.image} />
					</div>
					<div className="p-3">
						<p id="category" className="italic text-gray-500">
							{article.attributes.category.data.attributes.name}
						</p>
						<p id="title" className="text-xl font-bold">
							{article.attributes.title}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
