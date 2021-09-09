import { v4 as uuidv4 } from 'uuid';

export const users = [
    {
        id: uuidv4(),
        name: 'Octavio Flores',
        email: 'oflores@zcorp.com',
        password: 'abc123'
    },
    {
        id: uuidv4(),
        name: 'Farah Bennis',
        email: 'fbennis@zcorp.com',
        password: 'bbc123'
    },
    {
        id: uuidv4(),
        name: 'Peter Quan',
        email: 'pquan@zcorp.com',
        password: 'cbc123'
    },
]

export const projects = [
    {
        title: 'Site Upgrade - Login Form',
        status: 'active'
    },
    {
        title: 'Site Upgrade - User Dashboard',
        status: 'active'
    },
    {
        title: 'Server Migration',
        status: 'completed'
    },
]

export const assignments = [
    {
        projectId: 1,
        userId: '25b81a73-1e53-4195-80d1-8867f2378086'
    },
    {
        projectId: 2,
        userId: '25b81a73-1e53-4195-80d1-8867f2378086'
    },
    {
        projectId: 1,
        userId: 'e7e0b1b3-d267-477d-a564-a47332204a60'
    },
]
