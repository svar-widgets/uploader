import BasicInit from "./cases/BasicInit.svelte";
import ClientHandler from "./cases/ClientHandler.svelte";
import CustomControls from "./cases/CustomControls.svelte";
import OpenAPI from "./cases/OpenAPI.svelte";
import DropAPI from "./cases/DropAPI.svelte";

export const links = [
	["/base/:skin", "Basic usage", BasicInit],
	["/client/:skin", "Client side handlers", ClientHandler],
	["/controls/:skin", "With button", CustomControls],
	["/api/:skin", "Open API", OpenAPI],
	["/dropzone/:skin", "Drop API", DropAPI],
];