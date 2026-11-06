<script lang="ts">
	import {
		Uploader,
		UploaderList,
		type IUploaderFile,
	} from "@svar-ui/svelte-uploader";
	import { getData } from "../data";

	let { data } = $state(getData());

	function getBase64(file: File) {
		return new Promise<string>(r => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => r(reader.result as string);
		});
	}

	function base64Uploader(f: IUploaderFile) {
		return getBase64(f.file!).then(v => {
			return {
				status: "server" as const,
				url: v,
				file: f.file,
				id: f.id,
				size: f.file!.size,
			};
		});
	}

	function handleUpload(ev: IUploaderFile) {
		console.log(ev);
	}
</script>

<div class="demo-box">
	<h4>Uploader with custom handler (no server side)</h4>
	<div class="demo">
		<UploaderList bind:data />
		{#each data as obj (obj.id)}
			{#if obj.status === "server"}
				<img
					src={obj.url}
					alt=""
					style="width:50px;height:50px;object-fit:cover;"
				/>
			{/if}
		{/each}
		<Uploader
			bind:data
			uploadURL={base64Uploader}
			onupload={handleUpload}
		/>
	</div>
</div>
