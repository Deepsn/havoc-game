import { MatterComponents } from "@/shared/matter/component";
import { remotes } from "@/shared/remotes";
import { AnyEntity, World, useEvent } from "@rbxts/matter";
import { $print } from "rbxts-transform-debug";
import { ClientState } from "../runtime.client";

const localEntityMap = new Map<AnyEntity, AnyEntity>();

function ReceiveReplication(world: World, state: ClientState) {
	for (const [, payload] of useEvent(
		remotes.matter.replicate,
		remotes.matter.replicate,
	)) {
		$print("Received replication from server", payload);
		for (const [serverEntityId, components] of payload) {
			const clientEntityId = localEntityMap.get(serverEntityId);

			if (clientEntityId && next(components) === undefined) {
				world.despawn(clientEntityId);
				localEntityMap.delete(serverEntityId);

				if (state.debugEnabled) {
					$print(`Entity despawned ${clientEntityId}`);
				}

				continue;
			}

			const componentsToAdd = new Set<AnyEntity>();
			const componentsToRemove = new Set<AnyEntity>();

			for (const [id, componentData] of components) {
				if (componentData) {
					$print(id, componentData, MatterComponents, MatterComponents.get(id));
				}
			}
		}
	}
}

export = ReceiveReplication;
