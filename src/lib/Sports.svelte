<script lang="ts">
	import {base} from '$app/paths';

	// TODO BLOCK image
</script>

<menu>
	<li>
		<a href="{base}/classsic" title="svelte snake sports: classssic">
			<img
				alt="logo for svelte snake sports: classsic"
				src="{base}/assets/classsic.webp"
				class="clickable-box"
			/>
		</a>
	</li>
	<li>
		<a href="{base}/ssspeed" title="svelte snake sports: ssspeed">
			<img
				alt="logo for svelte snake sports: ssspeed"
				src="{base}/assets/ssspeed.webp"
				class="clickable-box"
			/>
		</a>
	</li>
	<li>
		<a href="{base}/clussster" title="svelte snake sports: clussster">
			<img
				alt="logo for svelte snake sports: clussster"
				src="{base}/favicon.png"
				class="clickable-box"
			/>
		</a>
	</li>
</menu>

<style>
	li {
		list-style: none;
		margin-bottom: var(--spacing_xl5);
	}
	a {
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
</style>
