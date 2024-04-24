import MonacoEditor from "@/components/editor";
import redis from "@/lib/redis";

async function Page({ params }: { params: { id: string } }) {
  const data = await redis.get(params.id);

  if (!data) return <div>Not found</div>;

  const ground = JSON.parse(data);
  const { name, type, files } = ground;

  return (
    <main>
      <MonacoEditor initFiles={files} name={name} type={type} />
    </main>
  );
}

export default Page;
