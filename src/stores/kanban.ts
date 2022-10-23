import type { BoardModel } from "@/models/board.model";
import { setLocalStorage } from "@/utils/local-storage.util";
import { getLocalStorage } from "@/utils/local-storage.util";
import { ref } from "vue";
import { defineStore } from "pinia";
import type { TaskModel } from "@/models/task.model";
import type { ColumnModel } from "@/models/column.model";

export const useKanbanStore = defineStore("kanban", () => {
  const tasks = ref<TaskModel[]>([]);
  const columns = ref<ColumnModel[]>([]);
  const boards = ref<BoardModel[]>([]);
  const currentBoardId = ref<string>("");

  function pushNewTask(task: Partial<TaskModel>) {
    task.id = self.crypto.randomUUID();
    tasks.value.push(task as TaskModel);
    setLocalStorage("tasks", tasks.value);
  }

  function removeTask(task: TaskModel) {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
    setLocalStorage("tasks", tasks.value);
  }

  function getTasksFromLocalStorage() {
    const tasksFromLocalStorage = getLocalStorage("tasks");
    tasksFromLocalStorage && (tasks.value = tasksFromLocalStorage);
  }

  function pushNewBoard(board: Partial<BoardModel>) {
    board.id = self.crypto.randomUUID();
    boards.value.push(board as BoardModel);
    setLocalStorage("boards", boards.value);
  }

  function removeBoard(board: BoardModel) {
    boards.value = boards.value.filter((b) => b.id !== board.id);
    setLocalStorage("boards", boards.value);
  }

  function getBoardsFromLocalStorage() {
    const boardsFromLocalStorage = getLocalStorage("boards");
    boardsFromLocalStorage &&
      (boards.value = boardsFromLocalStorage) &&
      (currentBoardId.value = boardsFromLocalStorage[0].id);
  }

  function initColumns() {
    const initialColumns = [
      {
        id: self.crypto.randomUUID(),
        title: "To Do",
        order: 0,
        color: "bg-red-100",
      },
      {
        id: self.crypto.randomUUID(),
        title: "In Progress",
        order: 1,
        color: "bg-yellow-100",
      },
      {
        id: self.crypto.randomUUID(),
        title: "Done",
        order: 2,
        color: "bg-green-100",
      },
    ];
    columns.value = initialColumns;
    setLocalStorage("columns", columns.value);
  }

  function getColumnsFromLocalStorage() {
    const gottenColumns = getLocalStorage("columns");
    gottenColumns ? (columns.value = gottenColumns) : initColumns();
  }

  function pushNewColumn(column: Partial<ColumnModel>) {
    column.id = self.crypto.randomUUID();
    columns.value.push(column as ColumnModel);
    setLocalStorage("columns", columns.value);
  }

  function removeColumn(column: ColumnModel) {
    columns.value = columns.value.filter((c) => c !== column);
    setLocalStorage("columns", columns.value);
  }

  function setCurrentBoardId(id: string) {
    currentBoardId.value = id;
  }

  return {
    tasks,
    columns,
    boards,
    currentBoardId,
    pushNewTask,
    getTasksFromLocalStorage,
    getColumnsFromLocalStorage,
    pushNewColumn,
    removeTask,
    removeColumn,
    pushNewBoard,
    removeBoard,
    getBoardsFromLocalStorage,
    setCurrentBoardId,
  };
});
