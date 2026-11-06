<script lang="ts">
	import { Uploader, type IUploaderFile } from "@svar-ui/svelte-uploader";
	import CustomDropArea from "../custom/CustomDropArea.svelte";

	// fake backend
	const uploadURL = (file: IUploaderFile) => {
		return Promise.resolve({
			...file,
			status: "server" as const,
			url: "http://some.com/files/" + file.id,
		});
	};

	const apiOnly = true;
	let data = $state<IUploaderFile[]>([]);
</script>

<div class="demo-box">
	<h4>Uploader API (custom drop zone)</h4>
	<div class="demo">
		<Uploader {apiOnly} {uploadURL} bind:data>
			<CustomDropArea />
		</Uploader>
	</div>
</div>
