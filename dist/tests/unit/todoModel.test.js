/**
 * Unit test for the Todo model using Node's built-in test runner.
 * These tests validate pure logic and use mock states to ensure predictable outcome
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createEmptyState, addTodo, toggleTodo, getVisibleTodos, getItemsLeftCount } from "../../src/todoModel.js";
import { emptyState, oneActiveOneCompletedState, filteredActiveState } from "./mocktodoStates.js";
test("createEmptyState returns expected initial state", () => {
    const state = createEmptyState();
    assert.deepEqual(state, emptyState);
});
test("addTodo adds new todo and increments nextId", () => {
    const initial = createEmptyState();
    const updated = addTodo(initial, "Learn TypeScript testing");
    assert.equal(updated.todos.length, 1);
    assert.equal(updated.nextId, 2);
});
test("toggleTodo toggles completed flag", () => {
    const initial = {
        ...emptyState,
        todos: [{ id: 1, text: "Test", completed: false }],
        nextId: 2
    };
    const toggled = toggleTodo(initial, 1);
    assert.equal(toggled.todos[0].completed, true);
});
test("getVisibleTodos filters active todos", () => {
    const active = getVisibleTodos(filteredActiveState);
    assert.deepEqual(active.map((todo) => todo.text), ["Active 1", "Active 2"]);
});
test("getItemsLeftCount counts unfinished todos", () => {
    const count = getItemsLeftCount(oneActiveOneCompletedState);
    assert.equal(count, 1);
});
