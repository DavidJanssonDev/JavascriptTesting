
/**
 * Represents the filter type used to control which todos are visible.
 */
export type Filter = "all" | "active" | "completed";


/**
 * Represents a single Todo item.
 */
export interface Todo {
    /** Unique incremental ID for the Todo item. */
    id: number;

    /** Text content of the Todo. */
    text: string;

    /** Whether the Todo is completed. */
    completed: boolean;
}


/**
 * Represents the full Todo application state.
 */
export interface TodoState {
    /** Collection of all Todo items. */
    todos: Todo[];

    /** Next ID to assign when a Todo is created. */
    nextId: number;

    /** Current filter applied to the visible Todos. */
    filter: Filter;
} 


/**
 * Creates a fresh state for the Todo application.
 *
 * @returns {TodoState} The initial empty state.
 */
export function createEmptyState(): TodoState {
    return {
        todos: [],
        nextId: 1,
        filter: "all",
    };
}

/**
 * Adds a new Todo to the state.
 *
 * @param state - The current Todo state.
 * @param text - The raw text input from the user.
 * @returns {TodoState} A new state with the added Todo, or the same state if text is empty.
 */
export function addTodo(state: TodoState, text: string): TodoState {
    const trimmed: string = text.trim();
 
    if (!trimmed) return state;

    const newTodo: Todo = {
        id: state.nextId,
        text: trimmed,
        completed: false
    };

    return {
        ...state,
        nextId: state.nextId + 1,
        todos: [...state.todos, newTodo]
    };
}

/**
 * Updates teh currently active Todo Filter
 *
 * @param  {TodoState} state - The current Todo state.
 * @param  {number}    id    - The ID of the Todo to toggle 
 * @return {TodoState} A new State with the Todo updated
 */
export function toggleTodo(state: TodoState, id: number): TodoState {
    return {
        ...state, 
        todos: state.todos.map((todo) => 
            todo.id == id ? {...todo, completed: !todo.completed} : todo
        )
    }
}


/**
 * Updates the currently active Todo filter.
 *
 * @param state - The current Todo state.
 * @param filter - The requested filter value.
 * @returns {TodoState} The new state if valid, otherwise the original.
 */
export function setFilter(state: TodoState, filter: string): TodoState {
    if (filter === "all" || filter === "active" || filter === "completed") {
        return {...state, filter};
    }
    return state
}

/**
 * Retrieves a filtered list of Todos based on the state's filter.
 *
 * @param state - The current Todo state.
 * @returns {Todo[]} An array of visible Todos.
 */
export function getVisibleTodos(state: TodoState): Todo[] {
    if (state.filter === "active") return state.todos.filter((todo) => !todo.completed);
    if (state.filter === "completed") return state.todos.filter((todo) => todo.completed);
    return state.todos
}


/**
 * Counts how many Todos are still not completed.
 *
 * @param state - The current Todo state.
 * @returns {number} Count of unfinished Todos.
 */
export function getItemsLeftCount(state: TodoState): number {
    return state.todos.filter((todo) => !todo.completed).length   
}