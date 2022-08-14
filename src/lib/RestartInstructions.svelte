<script lang="ts">
	export let restart: () => void;
</script>

<!-- TODO probably hoist the styled wrapper -->
<div style:position="relative" style:left="{-25}px">
	presss <button class="inline" on:click={() => restart()}>r</button> to go again <slot />
</div>
