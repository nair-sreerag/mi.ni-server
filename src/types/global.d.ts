declare var global: NodeJS.Global;

declare namespace NodeJS {
    export interface Global {
        mongoHandle: any
    }
}
