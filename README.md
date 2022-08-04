# svelte 🐍 snake 🐍 sports

> games of snake in svelte —
> [ryanatkn.github.io/svelte-snake-sports](https://ryanatkn.github.io/svelte-snake-sports)

> intro video: [youtube.com/watch?v=ciei8H6IOWk](https://www.youtube.com/watch?v=ciei8H6IOWk)

## sports

- [classsic](https://ryanatkn.github.io/svelte-snake-sports/classsic) — eat many apples —
  [$lib/sports/ClasssicSnake.svelte](/src/lib/sports/classsic/ClasssicSnake.svelte)
- [ssspeed](https://ryanatkn.github.io/svelte-snake-sports/ssspeed) — eat apples asap —
  [$lib/sports/SsspeedSnake.svelte](/src/lib/sports/ssspeed/SsspeedSnake.svelte)
- more to come! including a library so you can make your own sports

caveats:

- it's not mobile friendly yet, should be soonish
- some of the code is still very rough from the port

## what

In 2016 I wrote a tiny [`snake-game`](https://ryanatkn.github.io/snake-game)
for an interview in React. Today I use Svelte instead and I continue to enjoy
[Snake](https://en.wikipedia.org/wiki/Snake_game)
for thinking through frontend development patterns.
This project started as
<a href="https://ryanatkn.github.io/svelte-snake-sports/classsic">a port</a>
of the React version to my current Svelte patterns (with some experiments and hacks)
and it's growing from there.

This project plans to make many distinct versions of Snake in Svelte that are
interesting in terms of gameplay, game design, and/or technical implementation with Svelte.
If we're lucky, it'll be simple enough for beginners to follow along
and deep enough to hold the interest of more advanced students like myself.

> note: [the project from 2016](https://ryanatkn.github.io/snake-game)
> uses Create React App and has no lockfile,
> and given that I wish not wake eldritch npm horrors,
> I am not going to try to run the code, and I advise you not to try,
> so much so that I won't even directly link the repo
> (though it's trivially inferred; also it's archived)

on the web:
[ryanatkn.github.io/svelte-snake-sports](https://ryanatkn.github.io/svelte-snake-sports)

## usage

```bash
npm run dev
# or
gro dev # npm i -g @feltcoop/gro
```

> learn more about [SvelteKit](https://github.com/sveltejs/kit),
> [Vite](https://github.com/vitejs/vite), [Gro](https://github.com/feltcoop/gro),
> and [Felt](https://github.com/feltcoop/felt)

## build

```bash
npm run build
# or
gro build
```

## deploy

[Deploy](https://github.com/feltcoop/gro/blob/main/src/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm run deploy
# or
gro deploy
```

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[uvu](https://github.com/lukeed/uvu) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[ESLint](https://github.com/eslint/eslint) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[Felt](https://github.com/feltcoop/felt) ∙
[Gro](https://github.com/feltcoop/gro)
& [more](package.json)

["Lurking Sloth"](/src/static/assets/Alexander_Nakarada__Lurking_Sloth.mp3)
by Alexander Nakarada
([serpentsoundstudios.com](https://www.serpentsoundstudios.com/),
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/))

generated images by [DALL-E](https://wikipedia.org/wiki/DALL-E):

- [classsic](/src/static/assets/classsic.webp):
  macro photography of an adorable cartoon snake with big eyes next to a red apple on lush green moss in a realistic 3d video game in the style of Tim Burton
- [ssspeed](/src/static/assets/ssspeed.webp):
  macro photography of a cute cartoon snake eating a red apple on lush green moss in a 3d video game

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

public domain ⚘ [The Unlicense](license)
