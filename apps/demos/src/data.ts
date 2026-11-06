import type { IUploaderFile } from "@svar-ui/svelte-uploader";

// fields returned by the demo upload handlers
declare module "@svar-ui/svelte-uploader" {
	interface IUploaderFile {
		url?: string;
		size?: number;
	}
}

export function getData(): { data: IUploaderFile[] } {
	const data: IUploaderFile[] = [];

	return { data };
}
