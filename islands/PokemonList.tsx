import { useEffect, useState } from "preact/hooks";
import PokemonItem from "../components/PokemonItem.tsx";
import { PokemonModel } from "../components/PokemonModel.tsx";

export default function PokemonList() {
  const [allPokemons, setAllPokemons] = useState<PokemonModel[]>([]);
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const getAllPokemons = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (data: { next: string; results: { name: string; url: string }[] }) => {
          createPokemonObject(data.results);
          setUrl(data.next);
        },
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
        })
        .catch((err) => setError(err.message));
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
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              type={pokemon.type}
            />
          );
        })}
      </div>
      {error !== "" ? <div>{error}</div> : <></>}
      {isLoading
        ? (
          <div class="my-8 py-2 px-4 bg-blue-500 text-white rounded-lg">
            よみこみちゅう
          </div>
        )
        : (
          <button
            class="my-8 py-2 px-4 bg-blue-500 text-white rounded-lg"
            onClick={getAllPokemons}
          >
            もっとみる
          </button>
        )}
    </div>
  );
}
