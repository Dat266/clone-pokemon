import React, { useState, useEffect } from "react";
import "./pokemon.css";
import { Detail } from "../interface";

interface Props {
	viewDetail: Detail;
	setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
	id: number;
	name: string;
	image: string;
	abilities:
		| {
				ability: string;
				name: string;
		  }[]
		| undefined;
}

const PokemonList = (props: Props) => {
	const { id, name, image, abilities, viewDetail, setViewDetail } = props;
	const [isSelected, setIsSelected] = useState<boolean>(false);

	useEffect(() => {
		setIsSelected(id === viewDetail?.id);
	}, [viewDetail]);

	const closeDetail = () => {
		setViewDetail({
			id: 0,
			isOpened: false,
		});
	};

	return (
		<div>
			{isSelected ? (
				<section className="pokemon-list-detailed">
					<div className="detail-container">
						<p className="detail-close" onClick={closeDetail}>
							x
						</p>
						<div className="detail-info">
							<img src={image} alt={name} className="detail-img" />
							<p className="detail-name">{name}</p>
						</div>
						<div className="detail-skill">
							<p className="ability">Ability:</p>
							{abilities?.map((ab: any) => {
								return <div>{ab.ability.name}</div>;
							})}
						</div>
					</div>
				</section>
			) : (
				<section className="pokemon-list-container">
					<div className="pokemon-name">{name}</div>
					<img src={image} alt={name} />
				</section>
			)}
		</div>
	);
};

export default PokemonList;
