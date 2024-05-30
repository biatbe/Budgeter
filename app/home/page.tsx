import DataHandling from "../data/page"
import Nav from "../navigation/page"

export default async function Home() {

  const categories = await fetch("http://localhost:3000/api/category", {
    cache: "no-cache"
  }).then(async (res) => await res.json())

  return (
    <div>
      <Nav/>
      <div className="flex min-h-full flex-1 flex-col mt-10 lg:px-8 px-8 grid-flow-col auto-cols-max">
        <div className="title-container flex flex-col text-center sm:w-full sm:mx-auto sm:w-full sm:max-w-4xl mb-10">
          <div>
            <DataHandling categories={categories}/>
          </div>
        </div>
      </div>
    </div>
  )
}