import CategoryHandler from "../category/page"
import Nav from "../navigation/page"

export default function Home() {
  
  return (
    <>
      <Nav/>
      <div className="flex min-h-full flex-1 flex-col mt-10 lg:px-8 px-8 grid-flow-col auto-cols-max">
        <div className="title-container sm:w-full sm:mx-auto sm:w-full sm:max-w-4xl mb-10">
          <CategoryHandler/>
        </div>
      </div>
    </>
  )
}