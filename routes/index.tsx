import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import PokemonItem from "../islands/PokemonItem.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="flex flex-col items-center">
      <header class="my-8">
        <h1 class="text-3xl font-semibold">ポケモン図鑑</h1>
      </header>
      <div class="flex flex-wrap justify-center gap-2">
        {/* <!-- PokemonItem コンポーネントを繰り返し表示 --> */}
        <PokemonItem />
        <PokemonItem />
        <PokemonItem />
        <PokemonItem />
        <PokemonItem />
        <PokemonItem />
        <PokemonItem />
        <PokemonItem />
        {/* <!-- 必要なだけ繰り返す --> */}
      </div>
      <button class="my-8 py-2 px-4 bg-blue-500 text-white rounded-lg">
        もっとみる
      </button>
    </div>
  );
}
