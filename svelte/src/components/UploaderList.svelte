<script>
	import { getContext } from "svelte";

	let { data = $bindable([]) } = $props();

	const _ = getContext("wx-i18n").getGroup("uploader");

	const fileSize = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];

	function removeAll() {
		data = [];
	}

	function remove(id) {
		data = data.filter(i => i.id !== id);
	}

	function formatSize(size) {
		let index = 0;
		while (size > 1024) {
			index++;
			size = size / 1024;
		}
		return Math.round(size * 100) / 100 + " " + _(fileSize[index]);
	}
</script>

{#if data.length}
	<div class="layout">
		<div class="header">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<i class="icon wxi-close" onclick={removeAll}></i>
		</div>
		<div class="list">
			{#each data as obj (obj.id)}
				<div class="row">
					<div class="file-icon"></div>
					<div class="name">{obj.name}</div>
					{#if obj.file}
						<div class="size">{formatSize(obj.file.size)}</div>
					{/if}
					<div class="controls">
						{#if obj.status === "client"}
							<i class="icon wxi-spin wxi-loading"></i>
						{:else if obj.status === "error"}
							<i class="icon wxi-alert"></i>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<i
								class="icon wxi-close"
								onclick={() => remove(obj.id)}
							></i>
						{:else if !obj.status || obj.status === "server"}
							<i class="icon wxi-check"></i>
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<i
								class="icon wxi-close"
								onclick={() => remove(obj.id)}
							></i>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.layout {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: var(--wx-padding);
		border-bottom: var(--wx-border);
	}

	.list {
		overflow: auto;
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--wx-padding);
		padding: var(--wx-padding);
		border-bottom: var(--wx-border);
	}

	.name {
		flex: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--wx-icon-size);
		height: var(--wx-icon-size);
		font-size: var(--wx-icon-size);
		line-height: 1;
		border-radius: var(--wx-border-radius);
		color: var(--wx-icon-color);
		cursor: pointer;
	}
	.icon:before {
		display: block;
	}
	.icon:hover {
		background-color: var(--wx-background-hover);
	}

	.row:hover .wxi-close {
		display: flex;
	}
	.row:hover .wxi-check,
	.row:hover .wxi-alert {
		display: none;
	}

	.row .wxi-close {
		display: none;
	}

	.wxi-check,
	.wxi-alert {
		display: flex;
	}
</style>
