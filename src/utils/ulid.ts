import { ulidFactory } from 'ulid-workers';

export const ulid = ulidFactory();
export const ulidSelector = () => `id${ulid()}`;
