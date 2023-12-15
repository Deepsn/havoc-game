import { start } from "@/shared/matter/start";
import { ReplicatedStorage } from "@rbxts/services";

declare const script: { systems: Folder } & LuaSourceContainer;

export interface ClientState {}

const clientState: ClientState = {};

start([script.systems, ReplicatedStorage.systems], clientState);
