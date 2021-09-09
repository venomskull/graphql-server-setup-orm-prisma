import ProjectAPI from "./datasource/project";
import UserAPI from "./datasource/user";

// Apollo types
export interface DataSourceConfig<TContext = any> {
    context: TContext;
    cache: KeyValueCache;
}

export declare type DataSources<TContext> = {
    [name: string]: DataSource<TContext>;
}

export interface dataSources {
    userAPI: UserAPI,
    projectAPI: ProjectAPI
}

// Project types
export interface user {
    id: string;
    name: string;
    email: string;
    projects: projectAssignment[];
}

export interface projectAssignment {
    projectId: number;
    userId: string;
    project: project;
    user: user;

}

export interface project {
    id: number;
    title: string;
    status: string;
    members: projectAssignment[];
}