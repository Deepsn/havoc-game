import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import Roact, { StrictMode } from "@rbxts/roact";
import { App } from "@/client/components/app/app";

export function startReact() {
	const root = createRoot(new Instance("Folder"));
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

	root.render(
		createPortal(
			<screengui key={"GameUI"}>
				<StrictMode>
					<App />
				</StrictMode>
			</screengui>,
			playerGui,
		),
	);
}
