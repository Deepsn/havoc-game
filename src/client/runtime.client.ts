import { start } from "@/shared/matter/start";
import { ReplicatedStorage } from "@rbxts/services";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

export interface ClientState {}

const clientState: ClientState = {};

start([script.Parent.systems, ReplicatedStorage.Shared.systems], clientState);
