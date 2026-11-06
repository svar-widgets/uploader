import BasicInit from "./cases/BasicInit.svelte";
import ClientHandler from "./cases/ClientHandler.svelte";
import CustomControls from "./cases/CustomControls.svelte";
import OpenAPI from "./cases/OpenAPI.svelte";
import DropAPI from "./cases/DropAPI.svelte";
import Localization from "./cases/Localization.svelte";

export const links = [
	["/base/:skin", "Basic usage", BasicInit, "BasicInit"],
	["/client/:skin", "Client side handlers", ClientHandler, "ClientHandler"],
	["/controls/:skin", "With button", CustomControls, "CustomControls"],
	["/api/:skin", "Open API", OpenAPI, "Open API"],
	["/dropzone/:skin", "Drop API", DropAPI, "Drop API"],
	["/locale/:skin", "Localization", Localization, "Localization"],
];
