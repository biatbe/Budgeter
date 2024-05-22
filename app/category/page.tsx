import CategoryDropdown from "./(components)/Dropdown";


export default async function CategoryHandler() {

    const categories = await fetch("http://localhost:3000/api/category", {
        cache: "no-cache"
    }).then(async (res) => await res.json())


    return (
        <>
            <CategoryDropdown categories={categories}/>
        </>
    )
}