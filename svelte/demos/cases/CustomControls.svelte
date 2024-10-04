<script>
	import { Button } from "wx-svelte-core";
	import { Uploader, UploaderList } from "../../src/index";
	import { getData } from "../data";

	let { data } = getData();

	const uploadURL = "http://localhost:3000/data";

</script>

<div class="demo-box">
	<h4>Uploader with custom controls</h4>
	<div class="demo">
		<Uploader let:open bind:data={data} {uploadURL}>
			<Button type="primary" click={open}>Upload files</Button>
		</Uploader>
		<UploaderList bind:data={data} />
	</div>
</div>
