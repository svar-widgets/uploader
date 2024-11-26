<div align="center">
	
# SVAR Svelte File Uploader

[![npm](https://img.shields.io/npm/v/wx-svelte-uploader.svg)](https://www.npmjs.com/package/wx-svelte-uploader)
[![License](https://img.shields.io/github/license/svar-widgets/uploader)](https://github.com/svar-widgets/uploader/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/wx-svelte-uploader.svg)](https://www.npmjs.com/package/wx-svelte-uploader)

[Demos](https://docs.svar.dev/svelte/core/samples-uploader)

</div>

A Svelte UI component for easy and intuitive file uploading, allowing users to drag and drop files or select them from their device.

### Versions for Svelte 4 and 5

There are two versions of the Uploader component: 
- version **1.x** was designed to work with Svelte 4
- version **2.x** is created for Svelte 5 (please note that this version is in beta and may contain some instabilities)

To use the SVAR Uploader v.2.0 beta for Svelte 5, install it as follows:

```
npm install wx-svelte-uploader
```

To use the SVAR Uploader for Svelte 4:

```
npm install wx-svelte-uploader@1.3.0
```

### How to Use

To use the widget, simply import the package and include the component in your Svelte file:

```svelte
<script>
	import { Uploader, UploaderList } from "wx-svelte-uploader";

	let data = [];
	const uploadURL = "http://localhost:3000/data";

	function handleUpload(ev) {
		console.log(ev.detail);
	}
</script>

<UploaderList bind:data />
<Uploader {uploadURL} bind:data on:upload={handleUpload} />
```

### How to Modify

Typically, you don't need to modify the code. However, if you wish to do so, follow these steps:

1. Run `yarn` to install dependencies. Note that this project is a monorepo using `yarn` workspaces, so npm will not work
2. Start the project in development mode with `yarn start`

### Run Tests

To run the test:

1. Start the test examples with:
    ```sh
    yarn start:tests
    ```
2. In a separate console, run the end-to-end tests with:
    ```sh
    yarn test:cypress
    ```
