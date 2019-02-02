import {environment} from '../../environments/environment';

export const backendUrls: {
  root: string;
  project: string;
  user: string; 
  me: string;
  ressource: string;
  todo: string; 
  positions: string;
  expenses: string
  avatar: string; 
  auth: string;
} = {
  root: environment.backendUrl,
  project: 'http://localhost:9000/api/projects/',
  user: 'http://localhost:9000/api/users/',
  me: 'http://localhost:9000/api/users/me/',
  ressource: 'http://localhost:9000/api/ressources/',
  todo: 'http://localhost:9000/api/todos/',
  positions: 'http://localhost:9000/api/positions/',
  expenses: 'http://localhost:9000/api/expenses/',
  avatar: 'http://localhost:9000/api/avatars/',
  auth: 'http://localhost:9000/api/auth/',
};