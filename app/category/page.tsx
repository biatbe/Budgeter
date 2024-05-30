import CategoryDropdown from "./(components)/Dropdown";

export default function CategoryHandler({onCategoryChange, selectedCategory, categories}) {

    return (
        <CategoryDropdown categories={categories} onCategoryChange={onCategoryChange} selectedCategory={selectedCategory}/>
    )
}