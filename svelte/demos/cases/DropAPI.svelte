<script>
	import { Uploader } from "../../src/index";
	import CustomDropArea from "../custom/CustomDropArea.svelte";

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
</script>

<div class="demo-box">
	<h4>Uploader API (custom drop zone)</h4>
	<div class="demo">
		<Uploader {apiOnly} {uploadURL} bind:data>
			<CustomDropArea />
		</Uploader>
	</div>
</div>
