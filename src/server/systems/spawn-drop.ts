import { Drop } from "@/shared/components/drop";
import { Model } from "@/shared/components/model";
import { World, useThrottle } from "@rbxts/matter";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { $print } from "rbxts-transform-debug";

function SpawnDrop(world: World) {
	if (useThrottle(10)) {
		const id = world.spawn(
			Drop({
				type: "Part",
			}),
		);
		$print(`Spawned drop with id ${id}`);
	}

	for (const [id, drop] of world.query(Drop).without(Model)) {
		const dropModel = ReplicatedStorage.Drops.FindFirstChild(
			drop.type,
		)?.Clone() as Model | undefined;

		if (!dropModel) {
			continue;
		}

		dropModel.Parent = Workspace;

		world.insert(
			id,
			Model({
				instance: dropModel,
			}),
		);
	}
}

export = SpawnDrop;
