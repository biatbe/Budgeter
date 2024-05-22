'use client'

import { useState } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import {Button} from "@nextui-org/button";


export default function CategoryDropdown({categories} : { categories: any}) {
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    
    console.log(categories)

    const handleSelected = (category : string) => {
        setSelectedCategory(category);
    }

    return (
        <Dropdown>
            <DropdownTrigger>
            <Button 
                variant='bordered'
                className="max-w-60 h-12 border-3 border-gray-600 rounded-2xl px-4 py-3 text-slate-200 font-bold cursor-pointer hover:bg-gray-500/20 hover:text-slate-300/50 focus:outline-none"
            >
                <div className="flex text-center">
                    <div className="overflow-hidden px-2">
                    {selectedCategory === '' ? "Choose a category" : selectedCategory} 
                    </div>
                </div>
            </Button>
            </DropdownTrigger>
            <DropdownMenu 
                className="w-60 px-3 py-3 shadow-md rounded-lg text-slate-200 cursor-pointer bg-neutral-900 focus:outline-none"
                aria-label="Dynamic Actions"
                items={categories}
            >
                {(category: {id: number, name: string}) => (
                    <DropdownItem
                    aria-label="Dynamic Actions" 
                    key={category.name}
                    onClick={() => handleSelected(category.name)} 
                    className="border-0 pl-1 h-12 hover:border-3 hover:border-gray-600 hover:bg-neutral-900 hover:rounded-xl focus:outline-none"
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