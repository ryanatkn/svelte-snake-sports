<script lang="ts">
	/*
  
  import React from 'react';
import './Score.css';

export default function Score({score}) {
  return (
    <div className="Score">
      {score}
    </div>
  );
}

*/

	export let score: number;
</script>

<div class="Score">
	{score}
</div>

<style>
	.Score {
		position: absolute;
		top: 5px;
		left: 5px;
		font-size: 18px;
		font-weight: 300;
		margin-right: 5px;
	}
</style>
