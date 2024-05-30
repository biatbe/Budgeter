'use client'

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/button";
import { Category } from "@prisma/client";


export default function CategoryDropdown({categories, onCategoryChange, selectedCategory} : { categories: Category[], onCategoryChange: any, selectedCategory: Category}) {
    const handleSelected = (category : Category) => {
        onCategoryChange(category);
    }

    return (
        <Dropdown>
            <DropdownTrigger>
            <Button 
                variant='bordered'
                className="max-w-60 h-12 shadow-xl border-3 border-gray-600 rounded-2xl px-4 py-3 text-black font-bold cursor-pointer hover:bg-gray-500/20 focus:outline-none"
            >
                <div className="flex text-center">
                    <div className="overflow-hidden px-2">
                    {!selectedCategory ? "Choose a category" : selectedCategory.name} 
                    </div>
                </div>
            </Button>
            </DropdownTrigger>
            <DropdownMenu 
                className="w-60 px-3 py-3 rounded-lg text-black cursor-pointer focus:outline-none"
                aria-label="Dynamic Actions"
                items={categories}
            >
                {(category: Category) => (
                    <DropdownItem
                    aria-label="Dynamic Actions" 
                    key={category.name}
                    onClick={() => handleSelected(category)} 
                    className="border shadow-md pl-2 my-1 h-12 hover:rounded-xl focus:outline-none "
                    >
                        <div className="break-words w-48">
                        {category.name}
                        </div>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
    
}