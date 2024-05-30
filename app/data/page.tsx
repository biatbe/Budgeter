'use client'

import { useCallback, useState } from "react";
import CategoryHandler from "../category/page";
import InputHandler from "../input/page";
import { Category } from "@prisma/client";


export default function DataHandling({categories}) {
    const [error, setError] = useState<string>('');
    const [category, setCategory] = useState<Category | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const handleCategoryChange = useCallback((selectedCategory) => {
        setError('');
        setCategory(selectedCategory);
    }, [category]);

    const handleAmountChange = (e) => {
        setError('');
        setAmount(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        const data = {
            income: amount > 0,
            category,
            amount,
            description,
        };

        if (!data.category) {
            setError("Choose a category!")
        } else if (data.amount === 0) {
            setError("Set an amount other than 0!")
        } else {
            try {
            const response = await fetch('http://localhost:3000/api/instance', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        
            if (response.ok) {
                console.log('Data submitted successfully');
                setAmount(0)
                setDescription('')
            } else {
                console.error('Failed to submit data');
            }
            } catch (error) {
            console.error('Error submitting data:', error);
            }
        }
      };

    return (
        <>
            <div className="text-red-500 text-xl font-bold mb-4">
                {error}
            </div>
            <CategoryHandler categories={categories} onCategoryChange={handleCategoryChange} selectedCategory={category}/>
            <InputHandler amount={amount} onSubmit={handleSubmit} onAmountChange={handleAmountChange} description={description} onDescriptionChange={handleDescriptionChange}/>
        </>
    )
}