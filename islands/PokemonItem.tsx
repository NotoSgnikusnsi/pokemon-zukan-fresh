export default function PokemonItem() {
  return (
    <div class="bg-white shadow-md rounded-lg overflow-hidden m-4 p-4 max-w-xs">
      <small class="text-gray-500">#01</small>
      <img src="pokemon-image-url" alt="pokemon-image" class="w-full h-auto" />
      <h3 class="text-lg font-semibold mt-2">Pokemon Name</h3>
      <h4 class="text-sm text-gray-600">Type</h4>
    </div>
  );
}
