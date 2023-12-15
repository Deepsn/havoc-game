import { start } from "@/shared/matter/start";

declare const script: { systems: Folder } & LuaSourceContainer;

export interface ServerState {}

const serverState: ServerState = {};

start([script.systems], serverState);
