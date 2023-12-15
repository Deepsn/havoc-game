import { start } from "@/shared/matter/start";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

export interface ServerState {}

const serverState: ServerState = {};

start([script.Parent.systems], serverState);
