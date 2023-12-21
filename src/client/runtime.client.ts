import { startReact } from "@/client/components/app";
import { start } from "@/shared/matter/start";
import { System } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

export interface ClientState {
	debugEnabled?: boolean;
}

const clientState: ClientState = {
	debugEnabled: true,
};

const [world, state] = start(
	[script.Parent.systems, ReplicatedStorage.Shared.systems],
	clientState,
);
export type RootSystem = System<[typeof world, typeof state]>;

startReact();
