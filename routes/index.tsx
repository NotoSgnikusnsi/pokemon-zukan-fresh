import PokemonList from "../islands/PokemonList.tsx";

export default function Home() {
  return (
    <div class="flex flex-col items-center">
      <header class="my-8">
        <h1 class="text-3xl font-semibold">Pokemon</h1>
      </header>
      <PokemonList />
    </div>
  );
}
