<script>
	import { Button } from "@svar-ui/svelte-core";
	import { getContext } from "svelte";
	import { apiKey } from "../../src/index";

	const api = getContext(apiKey);
	let log = $state([]);

	function testUpload() {
		api.open({
			selected: file => {
				log = [...log, `adding file: ${file.name}`];
			},
			uploaded: file => {
				log = [...log, file.url];
			},
		});
	}
</script>

<div>
	<Button onclick={testUpload}>Select file</Button>
	<h3>Results:</h3>
	<pre>{#each log as line}{line + "\n"}{/each}</pre>
</div>
