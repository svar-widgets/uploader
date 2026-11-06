<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import {
		apiKey,
		type IDropAreaContext,
		type IUploaderApi,
	} from "@svar-ui/svelte-uploader";

	let { children }: { children?: Snippet } = $props();

	const api = getContext<IUploaderApi>(apiKey);
	let log = $state<string[]>([]);
	let node = $state<HTMLElement>();

	const apiSettings: IDropAreaContext = {
		temp: true,
		selected: file => {
			log = [...log, `adding file: ${file.name}`];
		},
		uploaded: file => {
			log = [...log, file.url!];
		},
		dragEnter: () => {
			node!.classList.toggle("active");
		},
		dragLeave: () => {
			node!.classList.toggle("active");
		},
	};
</script>

<div
	class="area"
	class:active={false}
	bind:this={node}
	use:api.droparea={{ ...apiSettings }}
>
	{#if children}{@render children()}{:else}
		<div class="block">Drop files here</div>
		{#if log.length}
			<div class="block">
				<h4>Results:</h4>
				<pre>{#each log as line}{line + "\n"}{/each}</pre>
			</div>
		{/if}
	{/if}
</div>

<style>
	.area {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 10px;
		border: 1px #785bef;
		border-style: dashed;
		border-radius: 3px;
		background: #eaedf5;
		color: #2c2f3c;
	}
	.area.active {
		background: #785bef;
		color: #eaedf5;
	}
	.block pre {
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
