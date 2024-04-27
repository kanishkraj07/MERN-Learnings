import { Overview } from "./Overview";
import { PayoutDetails } from "./PayoutDetails";
import { TransactionsCount } from "./TransactionsCount";

export function PayoutContent () {
    return <div>
        <Overview />
        <div className="mx-5">
            <TransactionsCount />
            <PayoutDetails></PayoutDetails>
        </div>
    </div>
}