<script>
	import { Uploader, UploaderList } from "../../src/index";
	import { Segmented, Locale } from "@svar-ui/svelte-core";
	import { cn } from "@svar-ui/uploader-locales";
	import { cn as cnCore } from "@svar-ui/core-locales";

	let data = $state([]);

	const uploadURL = "http://localhost:3000/data";

	const langs = [
		{ id: "en", label: "EN" },
		{ id: "cn", label: "CN" },
	];
	let lang = $state("en");
</script>

<div class="demo-box">
	<div class="bar">
		<Segmented options={langs} bind:value={lang} />
	</div>
	{#if lang === "en"}
		<div class="demo">
			<UploaderList bind:data />
			<Uploader {uploadURL} bind:data />
		</div>
	{/if}

	{#if lang === "cn"}
		<Locale words={{ ...cn, ...cnCore }}>
			<div class="demo">
				<UploaderList bind:data />
				<Uploader {uploadURL} bind:data />
			</div>
		</Locale>
	{/if}
</div>

<style>
	.demo-box {
		gap: 20px;
		display: flex;
		flex-direction: column;
	}
</style>
