<script>
	import { uid } from "@svar-ui/lib-dom";
	import { onMount, setContext, getContext } from "svelte";
	import { apiKey } from "../helpers/consts";

	import { locale } from "@svar-ui/lib-dom";
	import { en } from "@svar-ui/uploader-locales";

	let {
		data = $bindable([]),
		ready = $bindable(new Promise(() => ({}))),

		accept = "",
		multiple = true,
		folder = false,
		uploadURL = "",
		apiOnly = false,
		disabled = false,
		children,
		onchange,
		onupload,
	} = $props();

	let input = $state();
	let drag = $state();
	let count = 0;
	let lastCtx = {};

	// set locale
	let l = getContext("wx-i18n");
	if (!l) {
		l = locale(en);
		setContext("wx-i18n", l);
	}
	const _ = getContext("wx-i18n").getGroup("uploader");

	export const droparea = (node, ctx) => {
		if (disabled) return;

		ctx = ctx || {};
		node.addEventListener("dragenter", () => {
			if (ctx.dragEnter) ctx.dragEnter();
			dragenter();
		});
		node.addEventListener("dragleave", () => {
			if (ctx.dragEnter) ctx.dragLeave();
			dragleave();
		});

		node.addEventListener("dragover", ev => ev.preventDefault(), true);
		node.addEventListener(
			"drop",
			ev => {
				ev.preventDefault();
				lastCtx = ctx;
				drop(ev);
				if (ctx.dragEnter) ctx.dragLeave();
			},
			true
		);
	};

	onMount(() => {
		input.webkitdirectory = folder;
	});

	function add(ev) {
		const files = Array.from(ev.target.files);
		files.forEach(f => addFile(f));
	}

	function drop(ev) {
		const items = Array.from(ev.dataTransfer.items);

		items.forEach(item => {
			const entry = item.webkitGetAsEntry();
			if (entry) flatten(entry);
		});

		drag = false;
		count = 0;
	}

	function flatten(item, path) {
		path = path || "";
		if (item.isFile) {
			item.file(file => {
				addFile(file);
			});
		} else if (item.isDirectory) {
			const dir = item.createReader();
			dir.readEntries(files => {
				files.forEach(file => {
					flatten(file, path + file.name + "/");
				});
			});
		}
	}

	function addFile(file) {
		const obj = {
			...lastCtx,
			id: uid(),
			status: "client",
			name: file.name,
			file,
		};

		if (obj.selected) obj.selected(obj);
		onchange && onchange(obj);

		if (multiple) {
			data = [...data, obj];
		} else {
			data = [obj];
		}

		upload(obj);
		input.value = "";
	}

	function defaultUploader(obj) {
		const formData = new FormData();
		formData.append("upload", obj.file);

		const config = {
			method: "POST",
			body: formData,
		};

		return fetch(uploadURL, config)
			.then(res => res.json())
			.then(
				data => ({ id: obj.id, ...data }),
				() => ({ id: obj.id, status: "error" })
			)
			.catch(error => console.log(error));
	}

	function upload(obj) {
		if (!obj) return;

		const request =
			typeof uploadURL === "function"
				? uploadURL(obj)
				: defaultUploader(obj);

		ready = request
			.then(r => {
				r.status = r.status || "server";
				updateData(obj.id, r);
			})
			.catch(error => {
				updateData(obj.id, { status: "error", error });
			});
	}

	// returns client if any file is being uploaded
	// returns error if any file has failed and no file is being uploaded
	// returns server if all files have been uploaded
	export function getState() {
		let status = "server";
		for (let i = 0; i < data.length; i++) {
			if (data[i].status === "client") return "client";
			if (data[i].status === "error") status = "error";
		}

		return status;
	}

	function updateData(id, result) {
		const ind = data.findIndex(i => i.id == id);
		const file = (data[ind] = { ...data[ind], ...result });

		const res = { ...file, status: getState() };
		if (file && file.uploaded) file.uploaded(res);
		onupload && onupload(res);

		if (file.temp) data = data.filter(i => i.id != id);
	}

	function dragenter() {
		if (count === 0) drag = true;
		count++;
	}

	function dragleave() {
		count--;
		if (count === 0) drag = false;
	}

	export function open(ctx) {
		lastCtx = ctx || {};
		input.click();
	}

	setContext(apiKey, { open, getState, droparea });
</script>

{#if apiOnly}
	<input
		type="file"
		class="input"
		bind:this={input}
		onchange={add}
		{accept}
		{multiple}
		{disabled}
	/>
	{@render children?.()}
{:else}
	<div
		class="label"
		class:active={drag}
		class:wx-disabled={disabled}
		use:droparea
	>
		<input
			type="file"
			class="input"
			bind:this={input}
			onchange={add}
			{accept}
			{multiple}
			{disabled}
		/>
		{#if children}{@render children({ open })}{:else}
			<div class="dropzone">
				<span>
					{_("Drop files here or")}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<span class="action" onclick={open}
						>{_("select files")}</span
					>
				</span>
			</div>
		{/if}
	</div>
{/if}

<style>
	.label {
		display: flex;
		align-items: center;
	}

	.label.active:not(.wx-disabled) .dropzone {
		background-color: var(--wx-background-alt);
	}
	.input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
	}

	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--wx-padding);
		border: var(--wx-input-border);
		border-style: dashed;
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-uploader-background);
	}
	.label:not(.wx-disabled) .action {
		cursor: pointer;
		color: var(--wx-color-link);
		text-decoration: underline;
	}

	.label.wx-disabled .dropzone {
		background: var(--wx-color-disabled);
		color: var(--wx-color-font-disabled);
	}
</style>
