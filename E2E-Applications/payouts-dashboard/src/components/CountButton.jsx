export function CountButton({name, count, varient}) {
    return <button className={"text-lg rounded-3xl px-3 py-1.5 border border-solid " + (varient === "primary" ? "bg-blue-600 text-cream-300" : "bg-[#f2f2f2] text-[#797979]") }>
        {name} ({count})
    </button>
}