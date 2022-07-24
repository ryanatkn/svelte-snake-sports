<script lang="ts">
	/*
  
import React from 'react';
import repeat from 'lodash/repeat';
import './Instructions.css';

export default function Instructions({game}) {
  return (
    <div className="Instructions">
      <p>use the arrow keys to move</p>
      <p style={{position: 'relative', top: 0, left: -15}}>
        eat apples!
      </p>
      {game.highScore
        ? <p>
            best {game.highScore} apple{game.highScore === 1 ? '' : 's'}{repeat('!', Math.round(game.highScore / 5))}
          </p>
        : null
      }
      <p style={{position: 'relative', top: 55, left: 55}}>
        don't bite yourself :O
      </p>
    </div>
  );
}



*/
	import type {GameState} from '../models/GameState';

	export let game: GameState;
</script>

<div class="Instructions">
	<p>use the arrow keys to move</p>
	<p style:position="relative" style:top="{0}px" style:left="{-15}px">eat apples!</p>
	{#if game.highScore}
		<p>
			best {game.highScore} apple{game.highScore === 1 ? '' : 's'}!
		</p>
	{/if}
	<p style:position="relative" style:top="{55}px" style:left="{55}px">don't bite yourself :O</p>
</div>

<style>
	.Instructions {
		position: absolute;
		top: 208px;
		left: 250px;
		font-size: 18px;
		font-weight: 300;
		word-break: break-all;
	}
</style>
