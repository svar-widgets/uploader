<script>
    import { getContext } from "svelte";
    import { apiKey } from "../../src/index";

    const api = getContext(apiKey);
    let log = [];
    let node;

    const apiSettings = {
        temp: true,
        selected: file => { 
            log = [ ...log, `adding file: ${file.name}`];
        },
        uploaded: file => { 
            log = [ ...log, file.url ];
        },
        dragEnter: () => node.classList.toggle("active"),
        dragLeave: () => node.classList.toggle("active"),
    }

</script>

<div 
    class="area"
    class:active={false}
    bind:this={node}
    use:api.droparea={{ ...apiSettings }} >
    <slot>
            <div class="block">Drop files here</div>
            {#if log.length}
            <div class="block">
                <h4>Results:</h4>
                <pre>{#each log as line}{line+"\n"}{/each}</pre>
            </div>
            {/if}
    </slot>
</div>

<style>
    .area {
		display: flex;
        flex-direction: column;
		justify-content: flex-start;
		padding: 10px;
		border: 1px #785BEF;
		border-style: dashed;
		border-radius: 3px;
		background: #EAEDF5;
        color: #2C2F3C
	}
    .area.active {
        background: #785BEF;
        color: #EAEDF5;
    }
    .block pre {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>