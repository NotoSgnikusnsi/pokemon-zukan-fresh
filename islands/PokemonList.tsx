import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import PokemonItem from "../components/PokemonItem.tsx";

export default function PokemonList() {
  interface PokemonList {
    id: number;
    name: string;
    image: string;
    type: string;
  }

  const [allPokemons, setAllPokemons] = useState<PokemonList[]>([]);
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
  );

  const getAllPokemons = () => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (data: { results: { name: string; url: string }[] }) => {
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
          const newPokemonList: PokemonList = {
            id: data.id,
            name: data.name,
            image: _img,
            type: _type,
          };
          console.log(newPokemonList);
          setAllPokemons((currentList) => [...currentList, newPokemonList]);
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
      <Button />
    </div>
  );
}
