export * from '$lib/clock';
export * from '$lib/SnakeGameState';
export * from '$lib/updateSnakeGameState';
export * from '$lib/SnakeGame';
export * from '$lib/Entity';

export {default as SnakeGame} from '$lib/SnakeGame.svelte';
export {default as Gamespace} from '$lib/Gamespace.svelte';
export {default as DomRenderer} from '$lib/renderers/dom/DomRenderer.svelte';
export {default as Settings} from '$lib/Settings.svelte';
export {default as Score} from '$lib/Score.svelte';
export {default as Stats} from '$lib/Stats.svelte';
export {default as Ticker} from '$lib/Ticker.svelte';
export {default as StageControls} from '$lib/StageControls.svelte';
export {default as TextBurst} from '$lib/TextBurst.svelte';
export {default as ScaledSnakeRenderer} from '$lib/ScaledSnakeRenderer.svelte';
export {default as ControlsInstructions} from '$lib/ControlsInstructions.svelte';
export {default as GameAudio} from '$lib/GameAudio.svelte';
export {default as TimedScores} from '$lib/TimedScores.svelte';
