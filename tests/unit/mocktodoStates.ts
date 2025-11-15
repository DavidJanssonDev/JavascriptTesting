/**
 *  Mock Todo State Objects used for predictable unit testing
 */

import type { TodoState } from "../../src/todoModel.js";


/** An empty Todo state with no items. */
export const emptyState: TodoState = {
  todos: [],
  nextId: 1,
  filter: "all",
};


/** A state with one active and one completed todo. Usefult for testing filters */
export const oneActiveOneCompletedState: TodoState = {
  todos: [
    {id: 1, text: "Active task", completed: false },
    {id: 2, text: "Completed task", completed: true}
  ],
  nextId: 3,
  filter: "all"
}


/** A state where all todos are completed. */
export const allCompletedState: TodoState = {
  todos: [
    { id: 1, text: "First", completed: true },
    { id: 2, text: "Second", completed: true }
  ],
  nextId: 3,
  filter: "all"
};


/** A state filtered to only show active todos. */
export const filteredActiveState: TodoState = {
  todos: [
    {id: 1, text: "Active 1", completed: false},
    {id: 2, text: "Completed 1", completed: true},
    {id: 3, text: "Active 2", completed: false},
  ],
  nextId: 3,
  filter: "active"
}