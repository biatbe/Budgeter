'use client'

export default function InputHandler({amount, onSubmit, onAmountChange, description, onDescriptionChange}) {
    const maxCharacters = 100;

    return (
    <div>
    <div className="mt-8">
        <p className="">Amount: </p>
        <input type='number' value={amount} onChange={onAmountChange} className="h-12 w-4/5 sm:w-2/5 p-4 rounded-xl shadow-md border border-slate-500 text-xl appearance-none focus:outline-none"/>
    </div>
    <div className="mt-8 flex flex-col items-center">
        <p>Additional information:</p>
        <textarea value={description} placeholder="Additional notes.." className="h-40 w-4/5 sm:w-2/5 p-4 rounded-xl shadow-md border-1 border-slate-500 text-mg resize-none" onChange={onDescriptionChange} maxLength={maxCharacters}/>
        <span className="w-4/5 sm:w-2/5 text-right">Remaining characters: {maxCharacters-description.length}</span>
    </div>
    <div className="mt-8">
        <button onClick={onSubmit} className="w-36 h-14 border border-slate-500 shadow-xl rounded-3xl font-bold hover:bg-slate-400/40">
            Submit
        </button>
    </div>
    </div>
    )
}