export const initialData: Data = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Meet Ira'},
    'task-2': { id: 'task-2', content: 'Find out which ring size we need'},
    'task-3': { id: 'task-3', content: 'Go home'},
    'task-4': { id: 'task-4', content: 'End study'},    
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To-do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Complete',
      taskIds: []
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3',]
}

export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type Data = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};
