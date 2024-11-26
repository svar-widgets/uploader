<script>
	import { Button } from "wx-svelte-core";
	import { Uploader, UploaderList } from "../../src/index";
	import { getData } from "../data";

	let { data } = $state(getData());

	const uploadURL = "http://localhost:3000/data";
</script>

<div class="demo-box">
	<h4>Uploader with custom controls</h4>
	<div class="demo">
		<Uploader bind:data {uploadURL}>
			{#snippet children({ open })}
				<Button type="primary" click={open}>Upload files</Button>
			{/snippet}
		</Uploader>
		<UploaderList bind:data />
	</div>
</div>
