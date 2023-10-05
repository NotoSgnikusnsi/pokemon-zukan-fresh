import PokemonList from "../islands/PokemonList.tsx";
import Header from "../components/Header.tsx";

export default function Home() {
  return (
    <div class="flex flex-col items-center">
      <Header />
      <PokemonList />
    </div>
  );
}
