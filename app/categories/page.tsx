'use client'

import { useEffect, useRef, useState } from "react"
import Nav from "../navigation/page"
import { Category } from "@prisma/client"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline"

export default function Categories() {
    const [name, setName] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState<string>('')
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [prevCategory, setPrevCategory] = useState<Element>();
    
    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editingCategoryId) {
                if (prevCategory && !prevCategory.contains(event.target)) {
                    setEditingCategoryId(null);
                    if (prevCategory) {
                        prevCategory.classList.add("group")
                    }
                    setPrevCategory(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingCategoryId]);

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

    const handleEditClick = (category) => {
        const categoryContainer = document.querySelector('#categoryContainer' + category.id);
        const categoryInput: any = document.querySelector('#categoryName' + category.id)
        // We need to add the group class back to the previously clicked category, in order to add back the icons
        if (prevCategory) {
            prevCategory.classList.add("group")
        }
        setPrevCategory(categoryContainer)
        categoryContainer.classList.remove("group")
        setEditingCategoryId(category.id);
        setEditedName(category.name);
        // When clicking on it, it selects the text for easier editing
        categoryInput.select();
    };

    const handleInputChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleKeyPress = (e : any, categoryId : number, categoryName: string) => {
        if (e.key === 'Enter') {
            const category : Category = {id: categoryId, name: categoryName}
            handleEdit(category);
            setEditingCategoryId(null);
            prevCategory ? prevCategory.classList.add("group") : null;
        }
    };

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

    const handleDelete = async (categoryId : number) => {
        try {
            const response = await fetch('http://localhost:3000/api/category', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({categoryId: categoryId})
            })

            if (response.ok) {
                console.log("Successfully deleted category!")
                fetchCategories()
            } else {
                console.error("Failed to delete category!")
            }
        } catch (error) {
            console.error("Internal server error:", error);
        }
    }

    const handleEdit = async (category: Category) => {
        if (category.name.trim() === '') {
            setError("Category name is required!")
        } else if(categories.some(cat => cat.name.trim() === category.name.trim())) {
            setError("Category name is alredy in use!")
        } else {
            try {
                const response = await fetch("http://localhost:3000/api/category", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({category: category})
                })
                if (response.ok) {
                    console.log("Successfully updated category!")
                    fetchCategories()
                } else {
                    console.error("Failed to update:", response);
                }
            } catch (error) { 
                console.error("Internal server error:", error);
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
                    {categories ? categories.map((category : Category) => 
                        <div 
                        id={"categoryContainer" + category.id}
                        className="relative w-40 border border-slate-400 text-center p-2 rounded-lg m-2 shadow-md group"
                        >
                            {/* This makes sure only one category is editable at once, if the other one is clicked, that will be in edit mode */}
                            {editingCategoryId === category.id ? (
                                <input
                                id={"categoryName" + category.id}
                                value={editedName}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyPress(e, category.id, editedName)}
                                className="w-full bg-[#f1f1f1] text-center"
                                />
                            ) : (
                                <input
                                id={"categoryName" + category.id}
                                value={category.name}
                                className="group-hover:hidden w-full bg-[#f1f1f1] text-center"
                                readOnly
                                />
                            )}
                            <div id={"overlay" + category.id} className="hidden group-hover:flex text-center">
                                <span className="w-1/2 flex justify-center">
                                    <TrashIcon key={category.id} onClick={() => handleDelete(category.id)} className="h-8 text-red-800 cursor-pointer hover:text-red-800/50"/>
                                </span>
                                <span className="w-1/2 flex justify-center">
                                    <PencilSquareIcon key={category.id} onClick={() => handleEditClick(category)} className="h-8 text-blue-800 cursor-pointer hover:text-blue-800/50"/>
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}