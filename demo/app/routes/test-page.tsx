import { useLoaderData } from "@remix-run/react";
import type { V2_MetaFunction } from "partymix";

export function loader() {
  // Marks dependency here.
  return { sentence: `a sentence` };
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Evictor Test Page" },
    { name: "description", content: "This is a test page" },
  ];
};

export default function Index() {
  const { sentence } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <p>{sentence}</p>
    </div>
  );
}

