import { World } from "@rbxts/matter";
import { Model } from "../components";
import { attributeName } from "../constants/matter-component";

function UpdateModelAttributes(world: World) {
	for (const [id, model] of world.queryChanged(Model)) {
		if (model.new) {
			model.new.instance.SetAttribute(attributeName, id);
		}
	}
}

export = UpdateModelAttributes;
