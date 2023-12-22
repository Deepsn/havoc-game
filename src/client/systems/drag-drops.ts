import { Model } from "@/shared/components";
import Make from "@rbxts/make";
import { World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import { LocalPlayer } from "../constants/player";
import { ClientState, RootSystem } from "../runtime.client";
import { getMouseHit } from "../utils/mouse-utils";
import ObjectHovers from "./object-hovers";

const attachment0 = Make("Attachment", {
	Visible: true,
	Parent: Workspace.Terrain,
});

const dragAlign = Make("AlignPosition", {
	Mode: Enum.PositionAlignmentMode.OneAttachment,
	Attachment0: attachment0,
	Parent: Workspace.Terrain,
});

function DragDrops(world: World, state: ClientState) {
	const { hoveredEntityId, currentDraggingEntityId } = state;
	const isHolding = UserInputService.IsMouseButtonPressed(
		Enum.UserInputType.MouseButton1,
	);

	if (!isHolding) {
		state.currentDraggingEntityId = undefined;
		attachment0.Parent = undefined;
		return;
	}

	const id = currentDraggingEntityId ?? hoveredEntityId;
	const entityModel =
		id && world.contains(id) ? world.get(id, Model) : undefined;

	if (!entityModel) {
		return;
	}

	const character = LocalPlayer.Character;

	state.currentDraggingEntityId = id;
	const mouseHit = getMouseHit([character, entityModel.instance], 8);

	attachment0.Parent = entityModel.instance.PrimaryPart;
	dragAlign.Position = mouseHit.Position;
}

export = {
	system: DragDrops,
	after: [ObjectHovers],
} as RootSystem;
