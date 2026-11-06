<script lang="ts">
	import {
		Uploader,
		UploaderList,
		type IUploaderFile,
	} from "@svar-ui/svelte-uploader";

	let data = $state<IUploaderFile[]>([]);
	let data2 = $state<IUploaderFile[]>([]);

	const uploadURL = "http://localhost:3000/data";

	function handleUpload(ev: IUploaderFile) {
		console.log(ev);
	}
</script>

<div class="demo-box">
	<h4>Uploader with default drop zone</h4>
	<div class="demo">
		<UploaderList bind:data />
		<Uploader {uploadURL} bind:data onupload={handleUpload} />
	</div>

	<h4>Disabled Uploader</h4>
	<div class="demo">
		<UploaderList bind:data={data2} />
		<Uploader
			disabled
			{uploadURL}
			bind:data={data2}
			onupload={handleUpload}
		/>
	</div>
</div>
