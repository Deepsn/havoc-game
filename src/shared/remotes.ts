import { AnyComponent } from "@rbxts/matter";
import { Client, Server, createRemotes, namespace, remote } from "@rbxts/remo";

export const remotes = createRemotes({
	matter: namespace({
		replicate: remote<
			Client,
			[payload: Map<string, Map<string, AnyComponent>>]
		>(),
		start: remote<Server>(),
	}),
});
