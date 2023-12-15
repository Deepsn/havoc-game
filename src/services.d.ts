interface ReplicatedStorage {
	Shared: Folder & {
		constants: Folder & {
			core: ModuleScript;
		};
		matter: Folder & {
			start: ModuleScript;
		};
		systems: Folder;
	};
	rbxts_include: Folder & {
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	};
}

interface ServerScriptService {
	TS: Folder & {
		runtime: Script;
		systems: Folder & {
			"test-system": ModuleScript;
		};
	};
}
