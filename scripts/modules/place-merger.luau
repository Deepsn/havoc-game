local roblox = require("@lune/roblox")

local merger = {}

type GamePlace = typeof(roblox.deserializePlace(""))

function merger.mergePlaces(gamePlace: GamePlace, buildingPlace: GamePlace)
    local services_to_merge = {
        "Workspace",
        "ReplicatedStorage",
        "ServerStorage",
        "Lighting",
    }

    for _, service_name in services_to_merge do
        local buildingService = buildingPlace:GetService(service_name)
        local gameService = gamePlace:GetService(service_name)

        for _, child in ipairs(buildingService:GetChildren()) do
            child.Parent = gameService
        end
    end
end

return merger