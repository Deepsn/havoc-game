import { startReact } from "@/client/components/app";
import { start } from "@/shared/matter/start";
import { AnyEntity, System } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";

declare const script: {
	Parent: { systems: Folder } & Folder;
} & LuaSourceContainer;

export interface ClientState {
	debugEnabled?: boolean;
	hoveredEntityId?: AnyEntity;
	currentDraggingEntityId?: AnyEntity;
}

const clientState: ClientState = {
	debugEnabled: false,
};

const [world, state] = start(
	[script.Parent.systems, ReplicatedStorage.Shared.systems],
	clientState,
);
export type RootSystem = System<[typeof world, typeof state]>;

startReact();
