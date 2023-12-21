import { IS_CLIENT } from "@/shared/constants/core";
import { Debugger, Loop, System, World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { Context, HotReloader } from "@rbxts/rewire";
import { RunService, UserInputService } from "@rbxts/services";
import { $warn } from "rbxts-transform-debug";

export function start<S extends object>(
	containers: Instance[],
	state: S,
): [World, S] {
	type T = [World, S, Plasma.Widgets];
	type MatterSystem = System<T>;

	const world = new World();
	const matterDebugger = new Debugger<T>(Plasma);

	const loop = new Loop(world, state, matterDebugger.getWidgets());
	const hotreloader = new HotReloader();

	const systemsByModule = new Map<ModuleScript, MatterSystem>();
	let firstRunSystems: Array<MatterSystem> | undefined = [];

	function loadModule(module: ModuleScript, context: Context) {
		const originalModule = context.originalModule;

		const [success, system] = pcall(require, module) as LuaTuple<
			[boolean, MatterSystem]
		>;

		if (!success) {
			$warn("Error when loading module:", module.Name, system);
			return;
		}

		if (firstRunSystems) {
			firstRunSystems.push(system);
		} else if (systemsByModule.has(originalModule)) {
			// Hot reload
			// biome-ignore lint/style/noNonNullAssertion: oldSystem is guaranteed to exist
			const oldSystem = systemsByModule.get(originalModule)!;

			loop.replaceSystem(oldSystem, system);
			matterDebugger.replaceSystem(oldSystem, system);
		} else {
			loop.scheduleSystem(system);
		}

		systemsByModule.set(originalModule, system);
	}

	function unloadModule(_: ModuleScript, context: Context) {
		if (context.isReloading) {
			return;
		}

		const originalModule = context.originalModule;
		const oldSystem = systemsByModule.get(originalModule);

		if (oldSystem) {
			loop.evictSystem(oldSystem);
			systemsByModule.delete(originalModule);
		}
	}

	for (const container of containers) {
		hotreloader.scan(container, loadModule, unloadModule);
	}

	loop.scheduleSystems(firstRunSystems);
	firstRunSystems = undefined;

	matterDebugger.autoInitialize(loop);

	loop.begin({
		default: RunService.Heartbeat,
		stepped: RunService.Stepped,
	});

	if (IS_CLIENT) {
		UserInputService.InputBegan.Connect((input, gameProcessedEvent) => {
			if (input.KeyCode === Enum.KeyCode.F4 && !gameProcessedEvent) {
				matterDebugger.toggle();
			}
		});
	}

	return [world, state];
}
