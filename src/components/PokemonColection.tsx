import React from "react";
import { Detail, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";

interface Props {
	pokemons: PokemonDetail[];
	viewDetail: Detail;
	setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonColection = (props: Props) => {
	const { pokemons, viewDetail, setViewDetail } = props;
	const selecPokemon = (id: number) => {
		if (!viewDetail.isOpened)
			setViewDetail({
				id: id,
				isOpened: true,
			});
	};
	return (
		<div>
			<section
				className={
					viewDetail.isOpened
						? "collection-container-active"
						: "collection-container"
				}
			>
				{viewDetail.isOpened ? (
					<div className="overlay"></div>
				) : (
					<div className=""></div>
				)}
				{pokemons.map((pokemon) => {
					return (
						<div onClick={() => selecPokemon(pokemon.id)}>
							<PokemonList
								viewDetail={viewDetail}
								setViewDetail={setViewDetail}
								key={pokemon.id}
								id={pokemon.id}
								name={pokemon.name}
								abilities={pokemon.abilities}
								image={pokemon.sprites.front_default}
							/>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default PokemonColection;
