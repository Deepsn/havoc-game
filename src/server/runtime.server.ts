import { start } from "@/shared/matter/start";
import { ReplicatedStorage } from "@rbxts/services";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

// biome-ignore lint/suspicious/noEmptyInterface: no serverstate for now
export interface ServerState {}

const serverState: ServerState = {};

start([script.Parent.systems, ReplicatedStorage.Shared.systems], serverState);
