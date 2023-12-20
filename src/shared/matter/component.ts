import { component } from "@rbxts/matter";
import { Component } from "@rbxts/matter/lib/component";

type CreatedComponent = <T extends object>(data?: T) => Component<T>;

export const components = new Map<string, CreatedComponent>();

export function CreateComponent<T extends object>(
	name: string,
	defaultData?: T,
) {
	const createdComponent = component<T>(name, defaultData);

	components.set(name, createdComponent as CreatedComponent);

	return createdComponent;
}
