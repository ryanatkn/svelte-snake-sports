<script lang="ts">
	/*

import React from 'react';
import './Entity.css';

export default function Entity({entity}) {
  const positionX = entity.x * entity.width;
  const positionY = entity.y * entity.height;
  return (
    <div className="Entity"
      style={{
        width: entity.width,
        height: entity.height,
        left: positionX,
        top: positionY,
      }}
    >
    </div>
  );
}
 // formerly used transform: `translate3d(${positionX}px, ${positionY}px, 0)`,
 // now uses top/left to allow transform transitions to be used without being for position as well

*/
	import type {Entity} from '../models/Entity';

	export let entity: Entity;

	$: positionX = entity.x * entity.width;
	$: positionY = entity.y * entity.height;
</script>

<div
	class="Entity"
	style:width="{entity.width}px"
	style:height="{entity.height}px"
	style:left="{positionX}px"
	style:top="{positionY}px"
/>

<style>
	.Entity {
		display: block;
		position: absolute;
		border-radius: 5px;
	}
</style>
