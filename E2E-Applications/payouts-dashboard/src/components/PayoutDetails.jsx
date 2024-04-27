import { PayoutTable } from "./PayoutTable";

export function PayoutDetails () {
    return <div className="mt-8 flex flex-col gap-5 bg-white py-5">
            <div className="w-80 border-2 border-solid border-myGray-val flex justify-start gap-3 items-center text-lg p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-3 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input className="w-full outline-0 text-gray-500" type="text" placeholder="Order ID or Transactions ID"></input>
            </div>

        <PayoutTable />
    </div>
}