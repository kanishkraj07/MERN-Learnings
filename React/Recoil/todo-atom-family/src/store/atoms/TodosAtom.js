import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { TODOS } from "../../Todos";
import axios from "axios";

export const TodosAtomFamily = atomFamily({
    key: "TodosAtomFamily",
    default: selectorFamily({
        key: "TodosSelector",
        get: (id) => {
           return async ({get}) => {
            await new Promise((res, rej) => setTimeout(() => {res()}, 5000))
         const response =  await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
         return response.data.todo;
        }
    }
    })
})