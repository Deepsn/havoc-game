local process = require("@lune/process")
local roblox = require("@lune/roblox")
local env = require("modules/env-reader").config()
local merger = require('modules/place-merger')
local place = require('modules/place')

local placeName = "game.rbxl"
local placeId = assert(env.PLACE_ID, "PLACE_ID not found in .env")

local t0 = os.clock()

-- Compile local typescript files
print("🕒 Compiling typescript files")

local compileT0 = os.clock()
local compileResult = process.spawn(process.os == "windows" and "yarn.cmd" or "yarn", {"compile"})
local compileT1 = os.clock()

if compileResult.ok then
    print("🛠️ Compiled typescript files")
else
    error("❌ Failed to compile typescript files")
end

-- Build temporary game place
print("🕒 Building game place")

local buildResult = process.spawn(process.os == "windows" and "yarn.cmd" or "yarn", {"build"})

if buildResult.ok then
    print("🛠️ Built game place")
else
    error("❌ Failed to build game place")
end

-- Download the building place file
print("🕒 Downloading building place")

local buildPlaceContents = place.download(placeId)
local buildingGame = roblox.deserializePlace(buildPlaceContents)

print("⌛ Downloaded building place")

-- Merge the building place into the game place
print("🕒 Merging building place into game place")

local scriptsPlaceContents = place.getFromFile(placeName)
local scriptsGame = roblox.deserializePlace(scriptsPlaceContents)

merger.mergePlaces(scriptsGame, buildingGame)

print("✅ Merged building place into game place")

-- Save the game place
print("🕒 Saving game place")

place.save(scriptsGame, placeName)

print("💾 Saved game place")

print("🕒 Done in " .. os.clock() - t0 .. "s")
print("🕒 Compile time: " .. compileT1 - compileT0 .. "s")