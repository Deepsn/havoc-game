import { UserInputService, Workspace } from "@rbxts/services";
import { LocalPlayer } from "../constants/player";

const mouse = LocalPlayer.GetMouse();
const camera = Workspace.CurrentCamera;

export const raycastParams = new RaycastParams();
raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
raycastParams.FilterDescendantsInstances = [Workspace.Terrain];

export function getMouseTarget(
	RaycastParams: RaycastParams = raycastParams,
	range = 1_000,
) {
	if (!camera) {
		return {
			Position: Vector3.zero,
			Normal: Vector3.zero,
			Distance: range,
		} as RaycastResult & { Instance: undefined };
	}

	debug.profilebegin("getMouseTarget");

	const mousePosition = UserInputService.GetMouseLocation();
	const mouseRay = camera.ViewportPointToRay(mousePosition.X, mousePosition.Y);

	const cameraCFrame = camera.CFrame;
	const origin = cameraCFrame.Position;
	const direction = mouseRay.Direction.mul(range);

	const raycastResult = Workspace.Raycast(origin, direction, RaycastParams);
	const result =
		raycastResult ??
		({
			Position: origin.add(direction),
			Normal: Vector3.zero,
			Distance: range,
		} as RaycastResult & { Instance: undefined });

	debug.profileend();

	return result;
}

export function getMouseHit(
	ignoreList?: (Instance | undefined)[],
	range = 1_000,
	RaycastParams = raycastParams,
) {
	if (!camera) {
		return mouse.Hit;
	}

	debug.profilebegin("getMouseHit");

	if (ignoreList) {
		for (const ignore of ignoreList) {
			if (
				ignore &&
				!RaycastParams.FilterDescendantsInstances.includes(ignore)
			) {
				RaycastParams.AddToFilter(ignore);
			}
		}
	}

	const target = getMouseTarget(RaycastParams, range);
	const position = target.Position;
	const cameraCFrame = camera.CFrame;

	debug.profileend();

	return CFrame.lookAt(position, cameraCFrame.Position);
}
