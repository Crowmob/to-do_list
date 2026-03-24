export type Task = {
    id: number;
    name: string;
    priority: number;
    completed: boolean;
    category: string;
}

export type TaskActionRequest = {
    name: string;
    priority: number;
    completed: boolean;
    category: string;
}