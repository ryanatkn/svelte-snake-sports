export interface BenchmarkParams {
	tickCount: number;
	spawnsPerTick: number; // TODO BLOCK per unit time tho?, spawned+=spawnsPerTick, count--, loop until done
	// initialSpawns: number; // TODO BLOCK defaults to 0
	// minTimePerTick: number; // defaults to 0
	// maxTimePerTick: number; // defaults to `1000/60`
}

export interface BenchmarkOutput {
	params: BenchmarkParams;
	totalTime: number;
}
