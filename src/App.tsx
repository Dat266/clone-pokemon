import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonColection from "./components/PokemonColection";
import { Pokemon, Detail } from "./interface";

interface Pokemons {
	name: string;
	url: string;
}

const App: React.FC = () => {
	const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
	const [nextUrl, setNextUrl] = useState<string>("");
	const [load, setLoad] = useState<boolean>(true);
	const [viewDetail, setViewDetail] = useState<Detail>({
		id: 0,
		isOpened: false,
	});

	useEffect(() => {
		const getPokemon = async () => {
			const res = await axios.get(
				"https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
			);

			setNextUrl(res.data.next);

			res.data.results.forEach(async (pokemon: Pokemons) => {
				const poke = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
				);
				setPokemon((p) => [...p, poke.data]);

				setLoad(false);
			});
		};
		getPokemon();
	}, []);

	const nextPage = async () => {
		setLoad(true);
		const res = await axios.get(nextUrl);
		setNextUrl(res.data.next);
		res.data.results.forEach(async (pokemon: Pokemons) => {
			const poke = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
			);
			setPokemon((p) => [...p, poke.data]);
			setLoad(false);
		});
	};

	return (
		<div className="App">
			<div className="container">
				<header className="pokemon-header">PokemonFC</header>
				<PokemonColection
					pokemons={pokemon}
					viewDetail={viewDetail}
					setViewDetail={setViewDetail}
				/>
				<div className="btn">
					<button onClick={nextPage}>
						{load ? "Loading ..." : "Load more"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
