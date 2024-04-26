import { selector } from "recoil";
import { CountAtom } from "../atoms/CountAtom";

export const IsEvenSelector = selector({
    key: "isEvenSelector",
    get: ({get}) => {
       const count =  get(CountAtom);
       return count % 2 === 0;
    }
})