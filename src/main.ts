/**
 * This file connects the Todo model to he browser UI
 * It listens for user events, updates the application state, and re-renders the DOM.
 */

import {
    // Functions
    createEmptyState,
    addTodo,
    toggleTodo,
    setFilter,
    getVisibleTodos,
    getItemsLeftCount,

    // Types
    type TodoState,
    type Filter,
    type Todo,
} from "./todoModel.js";

/** Global application state. This is the single source of truth */
let state: TodoState = createEmptyState();

/** DOM references for interactive elements. */
const form = document.querySelector<HTMLFormElement>("#todo-form");
const input = document.querySelector<HTMLInputElement>("#todo-input");
const list = document.querySelector<HTMLUListElement>("#todo-list");
const countSpan = document.querySelector<HTMLSpanElement>("#todo-count");
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-button");

/** Renders the UI based on the current application state */
function render(): void {
    if (!list || !countSpan) return;

    // Clear UI list
    list.innerHTML = "";

    // Build list based on visible todos
    const visibleTodos: Todo[] = getVisibleTodos(state);

    for (const todo of visibleTodos) {
        // Create List item
        const listItem: HTMLElement = document.createElement("li");

        listItem.className = "todo-item" + (todo.completed ? " completed" : "");
        listItem.dataset.id = String(todo.id);

        // Input Element
        const checkbox: HTMLInputElement = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.className = "toggle-checkbox";

        // Span Element
        const span: HTMLSpanElement = document.createElement("span");
        span.textContent = todo.text;
        span.className = "text";

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        list.appendChild(listItem);
    }

    // Update counter
    const count = getItemsLeftCount(state);
    countSpan.textContent = count === 1 ? "1 item left" : `${count} item left`;

    // Update filter button active styles
    filterButtons.forEach((button) => {
        const filter = button.dataset.filter as Filter | undefined;
        button.classList.toggle("active", filter === state.filter);
    });
}

/**
 * Handle form submission → add new Todo
 */

form?.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    if (!input) return;

    state = addTodo(state, input.value);
    input.value = "";
    render();
});

/**
 * Handle toggle checkbox to complete/uncomplete todos.
 */
list?.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target?.matches("input.toggle-checkbox")) return;

    const listItem = target.closest<HTMLElement>(".todo-item");
    if (!listItem?.dataset.id) return;

    const id = Number(listItem.dataset.id);
    state = toggleTodo(state, id);
    render();
});

/**
 * Handle filter button clicks
 */

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        state = setFilter(state, filter ?? state.filter);
        render();
    });
});

render();
