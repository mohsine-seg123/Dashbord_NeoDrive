
export type TaskStatus='TODO' | 'IN_PROGRESS' | 'Done';

export type Task={
    id:string;
    status:TaskStatus;
    description:string;
}

export type Column={
    id: TaskStatus;
    title:string;
}