import { World } from "@rbxts/matter";
import { $print } from "rbxts-transform-debug";

function TestSystem(world: World) {
	$print("Client World loaded", world);
}

export = TestSystem;
