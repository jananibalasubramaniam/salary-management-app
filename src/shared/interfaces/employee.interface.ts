export interface Employee {
    id: string;
    username: string;
    fullName: string;
    salary: number;
}

export type OrderByType = 'id' | 'username' | 'fullName' | 'salary'; 

export type Order = 'asc' | 'desc';