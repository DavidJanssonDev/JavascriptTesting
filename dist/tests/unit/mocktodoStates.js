/**
 *  Mock Todo State Objects used for predictable unit testing
 */
/** An empty Todo state with no items. */
export const emptyState = {
    todos: [],
    nextId: 1,
    filter: "all",
};
/** A state with one active and one completed todo. Usefult for testing filters */
export const oneActiveOneCompletedState = {
    todos: [
        { id: 1, text: "Active task", completed: false },
        { id: 2, text: "Completed task", completed: true }
    ],
    nextId: 3,
    filter: "all"
};
/** A state where all todos are completed. */
export const allCompletedState = {
    todos: [
        { id: 1, text: "First", completed: true },
        { id: 2, text: "Second", completed: true }
    ],
    nextId: 3,
    filter: "all"
};
/** A state filtered to only show active todos. */
export const filteredActiveState = {
    todos: [
        { id: 1, text: "Active 1", completed: false },
        { id: 2, text: "Completed 1", completed: true },
        { id: 3, text: "Active 2", completed: false },
    ],
    nextId: 3,
    filter: "active"
};
