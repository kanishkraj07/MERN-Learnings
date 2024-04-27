import { CountButton } from "./CountButton";

export function TransactionsCount() {

    return <div className="flex flex-col gap-7 mt-8">
        <div className="text-black text-2xl font-sans">Transactions | This Month</div>
        <div className="flex gap-3">
            <CountButton name={"Payouts"} count={25} />
            <CountButton name={"Refunds"} count={10} varient={"primary"}/>
        </div>
    </div>
}
