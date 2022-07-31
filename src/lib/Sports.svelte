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
		<a href="{base}/slow-and-steady" title="slow and steady snake sports">
			<img
				alt="logo for svelte snake sports: slow and steady"
				src="{base}/assets/slow-and-steady.webp"
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
