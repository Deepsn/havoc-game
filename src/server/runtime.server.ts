import {start} from "@/shared/matter/start";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

// biome-ignore lint/suspicious/noEmptyInterface: no serverstate for now
export  interface ServerState {}

const serverState: ServerState = {};

start([script.Parent.systems], serverState);
