import Create from "@/app/Create";

function Page() {
  return (
    <main>
      <div className="container mt-20 flex items-center justify-between border-b-2 border-gray-800 pb-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create
        </h1>
        <Create />
      </div>

      <div className="container pt-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Your playgrounds
        </h3>
        <p className="mt-3">Sign In to see your playgrounds.</p>
      </div>
    </main>
  );
}

export default Page;
