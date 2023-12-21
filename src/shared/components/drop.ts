import { ReplicatedStorage } from "@rbxts/services";
import { CreateComponent } from "../matter/component";

export const Drop = CreateComponent<{
	type: keyof Omit<typeof ReplicatedStorage.Drops, keyof Folder>;
}>();
