interface PokemonList {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function PokemonItem({ id, name, image, type }: PokemonList) {
  return (
    <div class="bg-white shadow-md rounded-lg overflow-hidden m-2 p-4 max-w-xs">
      <small class="text-gray-500">{id}</small>
      <img src={image} alt="pokemon-image" class="w-full h-auto" />
      <h3 class="text-lg font-semibold mt-2">{name}</h3>
      <h4 class="text-sm text-gray-600">{type}</h4>
    </div>
  );
}
