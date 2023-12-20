import { CreateComponent } from "@/shared/matter/component";
import { ReplicatedStorage } from "@rbxts/services";

export const Drop = CreateComponent<{ type: keyof Omit<typeof ReplicatedStorage.Drops, keyof Folder> }>("Drop_");
