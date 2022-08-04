<script lang="ts">
	import {base} from '$app/paths';
</script>

<menu>
	<li>
		<a href="{base}/classsic" title="classssic snake sports">
			<img
				alt="logo for svelte snake sports: classsic"
				src="{base}/assets/classsic.webp"
				class="clickable-box"
			/>
		</a>
	</li>
	<li>
		<a href="{base}/ssspeed" title="ssspeed snake sports">
			<img
				alt="logo for svelte snake sports: ssspeed"
				src="{base}/assets/ssspeed.webp"
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
