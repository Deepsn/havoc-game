import { attributeName } from "@/shared/constants/matter-component";
import { AnyEntity, World } from "@rbxts/matter";
import { PlayerGui } from "../constants/player";
import { RootSystem } from "../runtime.client";
import { getModelFromPart } from "../utils/model-utils";
import { getMouseTarget } from "../utils/mouse-utils";

const hoverHighlight = new Instance("Highlight");
hoverHighlight.OutlineTransparency = 0;
hoverHighlight.FillTransparency = 1;
hoverHighlight.Parent = PlayerGui;

function ObjectHovers(world: World) {
	const target = getMouseTarget();
	const targetModel =
		target.Instance !== undefined
			? getModelFromPart(target.Instance)
			: undefined;

	const entityId = targetModel?.GetAttribute(attributeName) as
		| number
		| undefined;
	const targetExists =
		entityId !== undefined && world.contains(entityId as AnyEntity);

	hoverHighlight.Adornee = targetExists ? targetModel : undefined;
}

export = ObjectHovers satisfies RootSystem;
