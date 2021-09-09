import {assignments, projects, users} from '../data/seed';

// https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgres/
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers = async () => {
//   // ... you will write your Prisma Client queries here
//   await prisma.user.createMany({
//       data: users
//   });

//   const allUsers = await prisma.user.findMany();
//   console.log(JSON.stringify(allUsers));

// await prisma.project.createMany({
//     data: projects
// });

// const allProjects = await prisma.project.findMany();
// console.log(JSON.stringify(allProjects));

// await prisma.projectAssignment.createMany({
//     data: assignments
// });

// const allAssignments = await prisma.projectAssignment.findMany();
// console.log(JSON.stringify(allAssignments));



// https://www.prisma.io/docs/support/help-articles/working-with-many-to-many-relations

const result = await prisma.user.findMany({
    include: {
        projects: {
            include: {
                project: true
            }
        }
    }
});

// console.log(result[0].projects);
// console.log(result[1].projects);

const allUsers = result.map(user => {
    return {
        ...user,
        projects: user.projects.map(assignment => assignment.project)
    }
})

// console.log(allUsers[0].projects);
// console.log(allUsers[1].projects);

return allUsers;
  
}

// ==============================================================================


// // import { pool } from "../database/db";
// // import { v4 as uuidv4 } from 'uuid';


// // interface User {
// //     id: string
// //     name: string
// //     email: string
// //     password: string
// // }

// // export const readQuery = async (query: string) => {

// //     try {
// //         const res = await pool.query(query);
// //         return res.rows;
// //     } catch (err) {
// //         console.error(err);
// //     } 
// // }

// // export const getUsersFromUsersTable = async () => {
// //     const query = `
// //     SELECT * FROM users;
// //     `;
    
// //     return readQuery(query);
    
// // }

// // export const getAssignments = async () => {
// //     const query = `
// //     SELECT assignments.user_id, users.name, assignments.project_id, projects.title, projects.status 
// //     FROM ((users
// //     INNER JOIN assignments
// //     ON users.id = assignments.user_id)
// //     INNER JOIN projects
// //     ON assignments.project_id = projects.id);
// //     `;

// //     return readQuery(query);
// // }

// // export const findUserByEmail = async (email: string) => {
// //     const query = {
// //         text: 'SELECT * FROM users WHERE email = $1',
// //         values: [email]
// //     }

// //     try {
// //         const res = await pool.query(query);
// //         return res.rows;
// //     } catch (err) {
// //         console.error(err);
// //     }
// //     return [{
// //         id: '0',
// //         name: "J Doe",
// //         email: 'jdoe@zcorp.com',
// //         password: 'passwordz'
// //     }]
// // }



// // export const addUser = async (name: string, email: string, password: string) => {
    
// //     const query = {
// //         text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)',
// //         values: [uuidv4(), name, email, password],
// //     }
    
    
// //     const userQuery = await findUserByEmail(email);
// //     if (userQuery?.length === 0) {
// //         try {
// //             const res = await pool.query(query);
// //             console.log("User added.");
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     } else {
// //         console.log("Unable to add user. Check your email address");
// //     }
// // }

// // export const addProject = async (title: string, status: string) => {
// //     const query = {
// //         text: 'INSERT INTO projects(title, status) VALUES($1, $2)',
// //         values: [title, status],
// //     }

// //     try {
// //         const res = await pool.query(query);
// //         console.log("Project added.");
// //     } catch (err) {
// //         console.error(err);
// //     } 
// // }

// // export const addAssignment = async (user_email: string, project_id: number, user_name: string) => {
// //     let user_id: string = '';
// //     const user = await findUserByEmail(user_email);
// //     if (user?.length === 0) {
// //         console.log("User with that email not found.")
// //     } else {
// //       user_id = user[0].id;  
// //     }

// //     const query = {
// //         text: 'INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)',
// //         values: [project_id, user_id, user_name],
// //     }

// //     try {
// //         const res = await pool.query(query);
// //         console.log('Assignment created.');
// //     } catch (err) {
// //         console.error(err);
// //     } 
// // }

// // export const getUsers = async () => {
// //     const usersFromUsersTable = await getUsersFromUsersTable();
// //     const assignments = await getAssignments();
// //     const users = await usersFromUsersTable?.map(async (user) => {
// //         let projects: object [] = [];
// //         await assignments?.forEach(assignment => {
// //             if (user.id === assignment.user_id) {
// //                 projects.push({
// //                    id: assignment.project_id,
// //                    title: assignment.title,
// //                    status: assignment.status 
// //                 });
// //             }
// //         })
// //         return {
// //             id: user.id,
// //             name: user.name,
// //             email: user.email,
// //             projects: projects,
// //         }
// //     })
// //     return users;   
// // }

// // export const createUserTable = async () => {

// //     const query = `
// //     CREATE TABLE users (
// //         id varchar primary key,
// //         name varchar,
// //         email varchar,
// //         password varchar
// //     )
// //     `;

// //     return readQuery(query);
// // }

// // export const createProjectTable = async () => {

// //     const query = `
// //     CREATE TABLE projects (
// //         id serial primary key,
// //         title varchar,
// //         status varchar
// //     )
// //     `;

// //     return readQuery(query) ? "Table created." : "Unable to create table.";
// // }

// // export const createAssignmentTable = async () => {

// //     const query = `
// //     CREATE TABLE assignments (
// //         id serial,
// //         project_id int references projects (id),
// //         user_id varchar references users (id),
// //         primary key (project_id, user_id),
// //         user_name varchar
// //     )
// //     `;

// //     return readQuery(query) ? "Table created" : "Unable to create table.";
// // }

// // export const listTables = async () => {
// //     const query = `
// //     SELECT table_name
// //     FROM information_schema.tables
// //     WHERE table_schema = 'public'
// //     ORDER BY table_name;
// //     `
// //     try {
// //         const res = await pool.query(query);
// //         console.log(res.rows)
// //     } catch (err) {
// //         console.error(err)
// //     }
// // }