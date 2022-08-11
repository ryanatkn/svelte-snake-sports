<script lang="ts">
	import {base} from '$app/paths';

	import {sports} from '$lib/sports';
</script>

<menu>
	{#each sports as sport (sport)}
		<li>
			<a href="{base}{sport.slug}" title="svelte snake sports: {sport.name}">
				<img
					alt="logo for svelte snake sports: {sport.name}"
					src="{base}/assets{sport.slug}.webp"
					class="clickable-box"
				/>
			</a>
		</li>
	{/each}
</menu>

<style>
	li {
		list-style: none;
		margin-bottom: var(--spacing_xl5);
	}
	li:last-child {
		margin-bottom: 0;
	}
	a {
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
</style>
