export function PayoutCard({ varient, title, amount, ordersCount, footerTitle, footerVal }) {
    return <div>
    <div className= {(varient === "primary" ? "rounded-b-none" : "") + " bg-white rounded shadow flex flex-col gap-2 justify-center p-5"}>
            <div className="flex justify-start items-center gap-1.5 text-base font-600 text-gray-600">
                <div className="font-normal font-sans">{title}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>

            </div>
            <div className="flex justify-between items-center">
                <div className="text-3xl font-medium text-black">&#8377;{amount}</div>
                {ordersCount ? <div className="text-base underline flex font-sans font-medium cursor-pointer text-sky-700">{ordersCount} Orders 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                </div> : null }
            </div>
    </div>
    {varient === "primary" ? <div className="bg-[#64748b] flex justify-between text-cream-300 text-lg font-normal rounded shadow px-5 py-2 rounded-t-none">
                <div>{footerTitle}:</div>
                <div>{footerVal}</div>
            </div> : null }
    </div>
}