export type Task = {
    id: number;
    name: string;
    priority: number;
    completed: boolean;
}

export type TaskActionRequest = {
    name: string;
    priority: number;
    completed: boolean;
}