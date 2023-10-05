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
      .then((res) => {
        if (!res.ok) {
          throw new Error("ネットワークエラー");
        }
        return res.json();
      })
      .then((data) => {
        createPokemonObject(data.results);
        setUrl(data.next);
      })
      .catch((err) => {
        setError("データの取得中にエラーが発生しました: " + err.message);
      })
      .finally(() => setLoading(false));
  };

  const createPokemonObject = (results: { name: string; url: string }[]) => {
    const fetchPromises = results.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("データの取得中にエラーが発生しました");
          }
          return res.json();
        })
        .then((data) => ({
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          type: data.types[0].type.name,
        }))
    );

    Promise.all(fetchPromises)
      .then((newPokemons) => {
        setAllPokemons((currentList) =>
          [...currentList, ...newPokemons].sort((a, b) => a.id - b.id)
        );
      })
      .catch((err) => {
        setError(
          "ポケモンのデータ取得中にエラーが発生しました: " + err.message,
        );
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div class="flex flex-col items-center">
      <div class="flex flex-wrap justify-center gap-2">
        {allPokemons.map((pokemon, index) => (
          <PokemonItem
            key={index}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            type={pokemon.type}
          />
        ))}
      </div>
      {error && <div>{error}</div>}
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
