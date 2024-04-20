import { MonacoEditor } from "@/components/editor";
// import files from "@/components/editor/files";
import redis from "@/lib/redis";

async function Page({ params }: { params: { id: string } }) {
  const data = await redis.get(params.id);

  if (!data) return <div>Not found</div>;

  const files = JSON.parse(data);
  // console.log(files);
  // console.log({ data });

  return (
    <main>
      <MonacoEditor initFiles={files} />
    </main>
  );
}

export default Page;
