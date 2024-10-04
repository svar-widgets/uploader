<script>
	import { Uploader, UploaderList } from "../../src/index";

	let data = [];
	let data2 = [];

	const uploadURL = "http://localhost:3000/data";

	function handleUpload(ev) {
		console.log(ev.detail);
	}
</script>

<div class="demo-box">
	<h4>Uploader with default drop zone</h4>
	<div class="demo">
		<UploaderList bind:data />
		<Uploader {uploadURL} bind:data on:upload={handleUpload} />
	</div>

	<h4>Disabled Uploader</h4>
	<div class="demo">
		<UploaderList bind:data={data2} />
		<Uploader
			disabled
			{uploadURL}
			bind:data={data2}
			on:upload={handleUpload}
		/>
	</div>
</div>
