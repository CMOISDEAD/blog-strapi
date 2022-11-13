import React from "react";
import Link from "next/link";

export default ({ categories }) => {
	return (
		<div>
			<nav className="uk-navbar-container" data-uk-navbar={true}>
				<div className="uk-navbar-left">
					<ul className="uk-navbar-nav">
						<li>
							<Link href="/">
								<div>Strapi Blog</div>
							</Link>
						</li>
					</ul>
				</div>
				<div className="uk-navbar-right">
					<ul className="uk-navbar-nav">
						{categories.map((category) => {
							return (
								<li key={category.id}>
									<Link href={`/category/${category.attributes.slug}`}>
										<div className="uk-link-reset">
											{category.attributes.name}
										</div>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</div>
	);
};
