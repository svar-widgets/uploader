<script>
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
</script>

<div class="demo-box">
	<h4>Uploader API <br />(used by a custom component)</h4>
	<div class="demo">
		<Uploader {uploadURL} bind:data {apiOnly}>
			<CustomButton />
		</Uploader>
	</div>
</div>
