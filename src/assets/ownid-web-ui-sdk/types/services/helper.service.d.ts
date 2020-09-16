export declare function validateUrl(url: string): boolean;
export declare function find<T>(collection: T[], predicate: (item: T, index: number, collection: T[]) => boolean): T | null;
export declare function findIndex<T>(collection: T[], predicate: (item: T, index: number, collection: T[]) => boolean): number;
