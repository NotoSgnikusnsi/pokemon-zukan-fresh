import { PageProps } from "$fresh/server.ts";

export default function ArticlePage(props: PageProps) {
  const { name } = props.params;
  return (
    <div>
      <h1>Article: {name}</h1>
    </div>
  );
}
