import { Drop } from "@/shared/components";
import { attributeName } from "@/shared/constants/matter-component";
import { AnyEntity, World } from "@rbxts/matter";
import { LocalPlayer, PlayerGui } from "../constants/player";
import { RootSystem } from "../runtime.client";
import { getModelFromPart } from "../utils/model-utils";
import { getMouseTarget } from "../utils/mouse-utils";

const hoverHighlight = new Instance("Highlight");
hoverHighlight.OutlineTransparency = 0;
hoverHighlight.FillTransparency = 1;
hoverHighlight.Parent = PlayerGui;

const raycastParams = new RaycastParams();
raycastParams.FilterType = Enum.RaycastFilterType.Exclude;

function ObjectHovers(world: World) {
	const character = LocalPlayer.Character;

	if (
		character &&
		!raycastParams.FilterDescendantsInstances.includes(character)
	) {
		raycastParams.AddToFilter(character);
	}

	const target = getMouseTarget(raycastParams);
	const targetModel =
		target.Instance !== undefined
			? getModelFromPart(target.Instance)
			: undefined;

	const entityId = targetModel?.GetAttribute(attributeName) as
		| AnyEntity
		| undefined;
	const targetExists =
		entityId !== undefined &&
		world.contains(entityId) &&
		world.get(entityId, Drop) !== undefined;

	hoverHighlight.Adornee = targetExists ? targetModel : undefined;
}

export = ObjectHovers satisfies RootSystem;
