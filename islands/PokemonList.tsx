import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import PokemonItem from "../components/PokemonItem.tsx";
import { PokemonModel } from "../components/PokemonModel.tsx";

export default function PokemonList() {
  const [allPokemons, setAllPokemons] = useState<PokemonModel[]>([]);
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
  );

  const getAllPokemons = () => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data: { next: string; results: { name: string; url: string }[] }) => {
          createPokemonObject(data.results);
          setUrl(data.next);
        },
      );
  };

  const createPokemonObject = (results: { name: string; url: string }[]) => {
    results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          const _img = data.sprites.other["official-artwork"].front_default;
          const _type = data.types[0].type.name;
          const newPokemonList: PokemonModel = {
            id: data.id,
            name: data.name,
            image: _img,
            type: _type,
          };
          setAllPokemons((currentList) =>
            [...currentList, newPokemonList].sort((a, b) => a.id - b.id)
          );
        });
    });
  };

  useEffect(() => (
    getAllPokemons()
  ), []);

  return (
    <div class="flex flex-col items-center">
      <div class="flex flex-wrap justify-center gap-2">
        {allPokemons.map((pokemon, index) => {
          return (
            <PokemonItem
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.type}
            />
          );
        })}
      </div>
      <button
        class="my-8 py-2 px-4 bg-blue-500 text-white rounded-lg"
        onClick={getAllPokemons}
      >
        もっとみる
      </button>
    </div>
  );
}
