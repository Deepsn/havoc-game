import { Drop, Model } from "@/shared/components";
import { CreatedComponent } from "@/shared/matter/component";
import { remotes } from "@/shared/remotes";
import {
	AnyComponent,
	AnyEntity,
	System,
	World,
	useEvent,
} from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { $print } from "rbxts-transform-debug";

const REPLICATED_COMPONENTS = [Drop, Model] as CreatedComponent[];

function ReplicateComponents(world: World) {
	for (const [, player] of useEvent(Players, "PlayerAdded")) {
		const payload = new Map<AnyEntity, Map<string, AnyComponent>>();

		for (const component of REPLICATED_COMPONENTS) {
			for (const [entityId, componentData] of world.query(component)) {
				$print("entity id:", entityId);
				$print("component name:", tostring(component));
				$print("component data:", componentData);

				const components = payload.get(entityId) ?? new Map();
				const componentId = tostring(component);

				components.set(componentId, componentData);

				payload.set(entityId, components);
			}
		}

		$print(`Sending initial payload to player ${player.Name}`, payload);
		remotes.matter.replicate.fire(player, payload);
	}
}

export = {
	system: ReplicateComponents,
	priority: math.huge,
} satisfies System<World[]>;
