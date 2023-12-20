import {start} from "@/shared/matter/start";
import {ReplicatedStorage} from "@rbxts/services";
import {System} from "@rbxts/matter";
import {startReact} from "@/client/components/app";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

// biome-ignore lint/suspicious/noEmptyInterface: no clientstate for now
export  interface ClientState {}

const clientState: ClientState = {};

const [world, state] = start(
	[script.Parent.systems, ReplicatedStorage.Shared.systems],
	clientState,
);
export type RootSystem = System<[typeof world, typeof state]>;

startReact();
