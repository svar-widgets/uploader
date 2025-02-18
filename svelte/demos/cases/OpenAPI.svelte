<script>
	import { Button } from "wx-svelte-core";
	import { Uploader } from "../../src/index";
	import CustomButton from "../custom/CustomButton.svelte";

	// fake backend
	const uploadURL = file => {
		return Promise.resolve({
			...file,
			status: "server",
			url: "http://some.com/files/" + file.id,
		});
	};

	const apiOnly = true;
	let data = $state([]);
	let api = $state();
</script>

<div class="demo-box">
	<h4>Uploader API (used by a custom component)</h4>
	<div class="demo">
		<Uploader {uploadURL} {apiOnly}>
			<CustomButton />
		</Uploader>
	</div>

	<h4>Uploader API (used from the same component)</h4>
	<div class="demo">
		<Uploader
			multiple={false}
			{uploadURL}
			bind:data
			bind:this={api}
			{apiOnly}
		></Uploader>
		<Button onclick={() => api.open()}>Select file</Button>
		<div>
			{#each data as row}
				<pre>{JSON.stringify(row)}</pre>
			{/each}
		</div>
	</div>
</div>
