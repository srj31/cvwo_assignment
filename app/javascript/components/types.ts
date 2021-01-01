export type Tag = {
  id: number;
  name: string;
  task_id: number;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  tag: Tag;
};

export type Error = {
  id: number;
  status: number;
  message: string;
}

export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
}


export type CreateUser = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}