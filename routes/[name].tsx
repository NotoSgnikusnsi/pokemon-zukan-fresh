import { PageProps } from "$fresh/server.ts";

export default function ArticlePage(props: PageProps) {
  const { name } = props.params;
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white shadow-md rounded-lg overflow-hidden p-4 max-w-xs">
        <div class="flex items-center">
          <small class="text-gray-500">#01</small>
          <img
            src="pokemon-image-url"
            alt="pokemon-image"
            class="w-16 h-16 object-contain ml-4"
          />
          <div class="ml-4">
            <h3 class="text-lg font-semibold">Pokemon Name</h3>
            <h4 class="text-sm text-gray-600">Type</h4>
          </div>
        </div>
        <p class="mt-2">Pokemon Description</p>
      </div>
    </div>
  );
}
