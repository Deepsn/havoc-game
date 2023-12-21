import { AnyComponent, AnyEntity } from "@rbxts/matter";
import { Client, createRemotes, namespace, remote } from "@rbxts/remo";

export const remotes = createRemotes({
	matter: namespace({
		replicate: remote<
			Client,
			[payload: Map<AnyEntity, Map<string, AnyComponent>>]
		>(),
	}),
});
