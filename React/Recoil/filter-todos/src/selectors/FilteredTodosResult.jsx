import { selector } from "recoil";
import { TodosAtom } from "../atoms/TodosAtom";
import { FilterValueAtom } from "../atoms/FilterValueAtom";

export const FilteredTodosResults = selector({
    key: "FilteredTodosResults",
    get: ({get}) => {
        const todos = get(TodosAtom);
        const filterVal = get(FilterValueAtom);

        const result = todos.filter(todo => todo.title.includes(filterVal) || todo.description.includes(filterVal));
        console.log(result);

        return result;
    }
})