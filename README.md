# Havoc

Short lived survival-ish game idea

Tech used:
- Biome
- Rojo
- Roblox-TS
- Matter
- Lune
- Some libs

## Building

- Ensure that your `.env` file is configured

```env
BUILD_PLACE_ID=<building-place-id>
TEST_PLACE_ID=<testing-place-id>
TEST_UNIVERSE_ID=<testing-place-universe-id>
TEST_PLACE_API_KEY=<open-cloud-key> # guide at https://create.roblox.com/docs/en-us/cloud/open-cloud/usage-place-publishing
CANCEL_TESTING_PUBLISH=<boolean> # if syncing games should cancel the publish of the testing place
```

- Merge the building place with the source code 
```bash
yarn sync:games
```
> [!NOTE]
> it will publish to the testing place if the CANCEL_TESTING_PUBLISH on `.env` is false or undefined

- Generate typings using the generated place (game.rbxl)
```bash
yarn sync:types
```

- Run the roblox-ts compiler and rojo serve
```bash
yarn watch
```
