<script lang="ts">
	import {scale} from 'svelte/transition';
</script>

<div class="instructions" transition:scale|local>
	<div style:position="relative" style:top="{-95}px" style:left="{-95}px">paused</div>
	<div style:position="relative" style:top="{-75}px" style:left="{-75}px">paused</div>
</div>
