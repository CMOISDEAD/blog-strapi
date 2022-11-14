import React from "react";
import Link from "next/link";

export default ({ categories }) => {
	return (
		<nav className="flex justify-between w-full content-center items-center gap-4 px-5 mb-10 mt-2">
			<div>
				<Link href="/">
					<div className="uppercase text-1xl font-bold">Strapi Blog</div>
				</Link>
			</div>
			<div>
				<ul className="inline-flex gap-4 capitalize">
					{categories.map((category) => {
						return (
							<li key={category.id}>
								<Link href={`/category/${category.attributes.slug}`}>
									<div className="font-bold hover:underline">
										{category.attributes.name}
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
};
