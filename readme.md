# svelte 🐍 snake 🐍 sports

> games of [Snake](https://wikipedia.org/wiki/Snake_game)
> in [Svelte](https://github.com/sveltejs/svelte)
> and [SvelteKit](https://github.com/sveltejs/kit) —
> [ryanatkn.github.io/svelte-snake-sports](https://ryanatkn.github.io/svelte-snake-sports)

intro video — [youtube.com/watch?v=ciei8H6IOWk](https://www.youtube.com/watch?v=ciei8H6IOWk)

## sports

See [contributing.md](contributing.md) to submit highscores.

| 🐍                                                                                                                                                                                                                                                                                                                                               | sport                                                                 | goal                             | highscores                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/classsic"><img src="/src/static/assets/classsic.webp" alt="logo for classsic, macro photography of an adorable cartoon snake with big eyes next to a red apple on lush green moss in a realistic 3d video game in the style of Tim Burton" width="192" /></a>                            | [classsic](https://ryanatkn.github.io/svelte-snake-sports/classsic)   | eat many apples                  |                                                                                                                                                                    |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/ssspeed"><img src="/src/static/assets/ssspeed.webp" alt="logo for ssspeed, macro photography of a cute cartoon snake eating a red apple on lush green moss in a 3d video game" width="192" /></a>                                                                                        | [ssspeed](https://ryanatkn.github.io/svelte-snake-sports/ssspeed)     | eat apples asap                  |                                                                                                                                                                    |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/buncheses"><img src="/src/static/assets/buncheses.webp" alt="logo for buncheses, macro photography of an adorable green cartoon snake with huge cute eyes next to a pile of red apples on lush green moss, realistic 3d video game, digital art, vibrant, artstation" width="192" /></a> | [buncheses](https://ryanatkn.github.io/svelte-snake-sports/buncheses) | eat many whole bunches of apples | <ol><li>[@ryanatkn](https://github.com/ryanatkn) - <a href="https://www.youtube.com/watch?v=EorynexNDJI">9</a> - <small>uncontested world record</small></li></ol> |

See [contributing.md](contributing.md) to submit highscores.

Here's [the source code](https://github.com/ryanatkn/svelte-snake-sports/tree/main/src/lib/sports)
for each sport.

caveats:

- it's responsive to smaller screens but doesn't have good mobile controls yet
- some of the code is still very rough from the port, I just tried to ship gameplay asap
- some of the code has experimental patterns that I wouldn't recommend

plans:

- publish a library

## what

In 2016 I wrote a tiny [`snake-game`](https://ryanatkn.github.io/snake-game)
for an interview in React. Today I use Svelte instead and I continue to enjoy
[Snake](https://wikipedia.org/wiki/Snake_game)
for thinking through frontend development patterns.
This project started as
<a href="https://ryanatkn.github.io/svelte-snake-sports/classsic">a port</a>
of the React version to my current Svelte patterns (with some experiments and hacks)
and it's growing from there.

This project plans to make many distinct versions of Snake that are
interesting in terms of gameplay, game design, and/or technical implementation with Svelte.
If we're lucky, it'll be simple enough for beginners to follow along
and deep enough to hold the interest of more advanced students like myself.

> note: [the project from 2016](https://ryanatkn.github.io/snake-game)
> uses Create React App and has no lockfile,
> and given that I wish not wake eldritch npm horrors,
> I am not going to try to run the code, and I advise you not to try,
> so much so that I won't even directly link the repo
> (though it's trivially inferred; also it's archived/readonly)

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

- [classsic](/src/lib/sports/classsic):
  "macro photography of an adorable cartoon snake with big eyes next to a red apple on lush green moss in a realistic 3d video game in the style of Tim Burton"
  - font is [Georgia Bold](<https://wikipedia.org/wiki/Georgia_(typeface)>)
- [ssspeed](/src/lib/sports/ssspeed):
  "macro photography of a cute cartoon snake eating a red apple on lush green moss in a 3d video game"
  - font is [Gabriola](<https://wikipedia.org/wiki/Gabriola_(typeface)>)
- [buncheses](/src/lib/sports/buncheses):
  "macro photography of an adorable green cartoon snake with huge cute eyes next to a pile of red apples on lush green moss, realistic 3d video game, digital art, vibrant, artstation"
  - font is [Indie Flower](https://fonts.google.com/betterspecimen/Indie+Flower)

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

public domain ⚘ [The Unlicense](license)
