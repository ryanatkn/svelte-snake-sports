export interface BenchmarkParams {
	renderer: string;
	tickCount: number;
	spawnsPerTick: number; // TODO per unit time tho?, spawned+=spawnsPerTick, count--, loop until done
	// initialSpawns: number; // TODO defaults to 0
	// minTimePerTick: number; // defaults to 0
	// maxTimePerTick: number; // defaults to `1000/60`
}

export interface BenchmarkOutput {
	params: BenchmarkParams;
	totalTime: number;
}
