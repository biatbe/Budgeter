'use client'

import { useEffect, useState } from "react"
import Nav from "../navigation/page"
import { Category } from "@prisma/client"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

export default function Categories() {
    const [name, setName] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState<string>('')

            
    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const categories = await fetch("http://localhost:3000/api/category", {
            cache: "no-cache"
        }).then(async (res) => await res.json())

        setCategories(categories)
    }

    const handleNameChange = (e: any) => {
        setError('')
        setName(e.target.value)
    }

    const handleSubmit = async () => {
        if (name.trim() === '') {
            setError("Category name is required!")
        } else if(categories.some(category => category.name.trim() === name.trim())) {
            setError("Category name is alredy in use!")
        } else {
            try {
                const response = await fetch('http://localhost:3000/api/category', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name}),
                });
            
                if (response.ok) {
                    console.log('Category created successfully!');
                    setName('')
                    fetchCategories()
                } else {
                    console.error('Failed to create category!');
                }
                } catch (error) {
                console.error('Error creating category:', error);
            }
        }
    }

    return (
        <>
            <Nav/>
            <div className="flex flex-col items-center mt-8">
                <div className="flex flex-col items-center mb-4"> 
                    <p className="m-4 text-xl">Add a new category:</p>
                    <p className="text-red-500 font-bold text-xl">{error}</p>
                    <input 
                    value={name} 
                    placeholder="Category name" 
                    onChange={handleNameChange}
                    className="mb-4 p-2 bg-[#f1f1f1] border-b border-slate-300 w-60 h-12 focus:outline-none" />
                    <button onClick={handleSubmit} className="w-36 h-12 mb-6 border border-slate-500 shadow-xl rounded-3xl font-bold hover:bg-slate-400/40">
                        Submit
                    </button>
                    <span className="w-3/5 border-b shadow border-slate-300"></span>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xl mb-4">Current categories:</p>
                    {categories ? categories.map((category) => 
                        <div className="relative w-40 border border-slate-400 text-center p-2 rounded-lg m-2 shadow-md group">
                            <p className="group-hover:hidden">{category.name}</p>
                            <div className="hidden group-hover:flex text-center">
                                <span className="w-1/2 flex justify-center">
                                    <TrashIcon className="h-8 text-red-800 cursor-pointer hover:text-red-800/50"/>
                                </span>
                                <span className="w-1/2 flex justify-center">
                                    <PencilSquareIcon className="h-8 text-blue-800 cursor-pointer hover:text-blue-800/50"/>
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}