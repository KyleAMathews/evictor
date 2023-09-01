import { useLoaderData, Form } from "@remix-run/react";
import type { V2_MetaFunction, ActionArgs } from "partymix";

// PartyKit will inject the host into the server bundle
// so let's read it here and expose it to the client
declare const PARTYKIT_HOST: string;
export function loader() {
  return { partykitHost: PARTYKIT_HOST };
}

// Action that gets button click & then sends event to
// to the evictor & then tests how long page takes to change.
export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  console.log(body)

  return null
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Evictor Demo" },
    { name: "description", content: "Demos what Evictor is all about" },
  ];
};

export default function Index() {
  const { partykitHost } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Evictor Demo</h1>
      <div
        style={{ maxWidth: "1200px", display: "flex", flexDirection: "row" }}
      >
        {/* Left half with a button */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Form method="post" replace>
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Click Me
          </button>
          </Form>
        </div>

        {/* Right half with an iframe */}
        <div style={{ flex: 1 }}>
        <h2>Iframe of /test-page</h2>
          <iframe
            style={{ width: "100%", height: "400px", border: "dotted" }}
            src="/test-page"
            title="Test Page"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
