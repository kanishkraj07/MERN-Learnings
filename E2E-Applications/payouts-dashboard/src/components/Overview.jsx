import { PayoutCard } from "./PayoutCard";

export function Overview() {
    return <div className="bg-[#0c4a6e] p-4 flex flex-col gap-6">
        <div className="text-cream-300 text-2xl font-sans">Overview</div>
        <div className='grid grid-cols-1 gap-y-6 md:grid-cols-2 gap-x-6 xl:grid-cols-3'>
            <PayoutCard varient={"primary"} title={"Amount Pending"} amount={"95,312.30"} ordersCount={15} footerTitle={"Next Payment Date"} footerVal={"Today, 4:00PM"}></PayoutCard>
            <PayoutCard title={"Amount Pending"} amount={"83,312.23"} ordersCount={15}></PayoutCard>
            <PayoutCard title={"Amount Pending"} amount={"65,312.50"} ordersCount={15}></PayoutCard>
        </div>
    </div>
}