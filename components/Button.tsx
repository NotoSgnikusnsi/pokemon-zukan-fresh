import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    // <button
    //   {...props}
    //   disabled={!IS_BROWSER || props.disabled}
    //   class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    // />

    <button class="my-8 py-2 px-4 bg-blue-500 text-white rounded-lg">
      もっとみる
    </button>
  );
}
