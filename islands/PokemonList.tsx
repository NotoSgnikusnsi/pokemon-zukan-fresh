import { useEffect, useState } from "preact/hooks";
import PokemonItem from "../components/PokemonItem.tsx";
import { PokemonModel } from "../components/PokemonModel.tsx";

export default function PokemonList() {
  /* 変数を定義する */
  const [allPokemons, setAllPokemons] = useState<PokemonModel[]>([]); // ポケモンのリストを管理する
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
  ); // ポケモンのデータを取得するためのURLを管理する
  const [isLoading, setLoading] = useState(false); // ローディングの状態を管理する
  const [error, setError] = useState<string>(""); // エラー内容を管理する

  /* 20体のポケモンのリストを取得し渡す */
  const getAllPokemons = () => {
    setLoading(true); // ローディングを開始する
    fetch(url) // ポケモンのデータを取得する
      .then((res) => {
        if (!res.ok) { // 正常に通信できているか確認する
          throw new Error("ネットワークエラー"); // 例外を発生させcatchに送る
        }
        return res.json(); // jsonからオブジェクトに変換して渡す
      })
      .then((data) => {
        createPokemonObject(data.results); // ポケモンのリストを渡す
        setUrl(data.next); // 次の20体のポケモンを取得するためのURLを設定する
      })
      .catch((err) => {
        setError("データの取得中にエラーが発生しました: " + err.message); // 発生したエラーを設定する
      })
      .finally(() => setLoading(false)); // すべての処理が終わった後にローディングを終了する
  };

  /* 個々のポケモンのオブジェクトを作成する */
  const createPokemonObject = (results: { name: string; url: string }[]) => {
    const fetchPromises = results.map((pokemon) =>
      // 渡されたリストを元に個々のポケモンのオブジェクトを作成し、新しい配列を生成する
      fetch(pokemon.url) // ポケモンのデータを取得する
        .then((res) => {
          if (!res.ok) { // 正常に通信できているか確認する
            throw new Error("データの取得中にエラーが発生しました"); // 例外を発生させcatchに送る
          }
          return res.json(); // jsonからオブジェクトに変換して渡す
        })
        .then((data) => ({ // オブジェクトを作成する
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          type: data.types[0].type.name,
        }))
    );

    Promise.all(fetchPromises) // 非同期処理を同時に実行する
      .then((newPokemons) => { // ポケモンのリストを保存する
        setAllPokemons((currentList) =>
          [...currentList, ...newPokemons].sort((a, b) => a.id - b.id)
        );
      })
      .catch((err) => { // エラーが発生した場合、エラー内容を保存する
        setError(
          "ポケモンのデータ取得中にエラーが発生しました: " + err.message,
        );
      });
  };

  /* 最初にページが読み込まれたときにブラウザへ描画する */
  useEffect(() => {
    getAllPokemons();
  }, []);

  /* コンポーネントを返す */
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
