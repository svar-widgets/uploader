import type { Snippet } from "svelte";
import type { Action } from "svelte/action";

export type TID = string | number;

export type TUploaderStatus = "client" | "server" | "error";

// fields of the context passed to open() or to the droparea action,
// they are copied into every file selected through that call
export interface IUploaderContext {
	// called when a file is selected, before the upload starts
	selected?: (file: IUploaderFile) => void;
	// called when the upload of a file has finished
	uploaded?: (file: IUploaderFile) => void;
	// remove the file from data once it is uploaded
	temp?: boolean;
}

export interface IDropAreaContext extends IUploaderContext {
	dragEnter?: () => void;
	dragLeave?: () => void;
}

/**
 * A file in the uploader's `data`. The fields returned by the upload handler
 * or the server are merged into it. Declare such fields by merging into
 * this interface:
 *
 *     declare module "@svar-ui/svelte-uploader" {
 *         interface IUploaderFile { url?: string }
 *     }
 */
export interface IUploaderFile extends IUploaderContext {
	id: TID;
	name: string;
	file?: File;
	status?: TUploaderStatus;
	error?: unknown;
}

// custom upload handler, used instead of posting the file to an URL
export type TUploadHandler = (
	file: IUploaderFile
) => Promise<Partial<IUploaderFile>>;

// API provided by Uploader through the apiKey context
export interface IUploaderApi {
	open: (ctx?: IUploaderContext) => void;
	getState: () => TUploaderStatus;
	droparea: Action<HTMLElement, IDropAreaContext | undefined>;
}

export type TUploaderChildren = Snippet<[{ open: IUploaderApi["open"] }]>;
