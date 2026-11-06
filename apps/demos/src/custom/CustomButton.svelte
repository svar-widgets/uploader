<script lang="ts">
	import { Button } from "@svar-ui/svelte-core";
	import { getContext } from "svelte";
	import { apiKey, type IUploaderApi } from "@svar-ui/svelte-uploader";

	const api = getContext<IUploaderApi>(apiKey);
	let log = $state<string[]>([]);

	function testUpload() {
		api.open({
			selected: file => {
				log = [...log, `adding file: ${file.name}`];
			},
			uploaded: file => {
				log = [...log, file.url!];
			},
		});
	}
</script>

<div>
	<Button onclick={testUpload}>Select file</Button>
	<h3>Results:</h3>
	<pre>{#each log as line}{line + "\n"}{/each}</pre>
</div>
