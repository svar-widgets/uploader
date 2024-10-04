<script>
	import { Uploader, UploaderList } from "../../src/index";
	import { getData } from "../data";

	let { data } = getData();

	function getBase64(file) {
		return new Promise(r => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => r(reader.result);
		});
	}

	function base64Uploader(f) {
		return getBase64(f.file).then(v => {
			return {
				status: "server",
				url: v,
				file: f.file,
				id: f.id,
				size: f.file.size,
			};
		});
	}

</script>

<div class="demo-box">
	<h4>Uploader with custom handler (no server side)</h4>
	<div class="demo">
		<UploaderList bind:data={data} />
		{#each data as obj (obj.id)}
			{#if obj.status === 'server'}
				<img
					src={obj.url}
					alt=""
					style="width:50px;height:50px;object-fit:cover;" />
			{/if}
		{/each}
		<Uploader bind:data={data} uploadURL={base64Uploader} />
	</div>
</div>
