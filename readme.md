# svelte🐍snake🐍sports

> archived on Svelte 4 💥🐍🦴
> games of [Snake](https://wikipedia.org/wiki/Snake_game)
> in [Svelte](https://github.com/sveltejs/svelte)
> and [SvelteKit](https://github.com/sveltejs/kit)

⚠️ archived because the code is very experimental/messy and it's just snake

Play: [ryanatkn.github.io/svelte-snake-sports](https://ryanatkn.github.io/svelte-snake-sports/)

Watch the intro video: [youtube.com/watch?v=ciei8H6IOWk](https://www.youtube.com/watch?v=ciei8H6IOWk)

Watch a run of buncheses: [youtube.com/watch?v=EorynexNDJI](https://www.youtube.com/watch?v=EorynexNDJI)
(visuals were improved after the video was made, that white bg wew)

## sports

| 🐍                                                                                                                                                                                                                                                                                                                                                                               | sport                                                                 | goal                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/classsic"><img src="/static/assets/classsic.webp" alt="logo for classsic, macro photography of an adorable cartoon snake with big eyes next to a red apple on lush green moss in a realistic 3d video game in the style of Tim Burton" width="192" /></a>                                                                | [classsic](https://ryanatkn.github.io/svelte-snake-sports/classsic)   | eat many apples                  |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/ssspeed"><img src="/static/assets/ssspeed.webp" alt="logo for ssspeed, macro photography of a cute cartoon snake eating a red apple on lush green moss in a 3d video game" width="192" /></a>                                                                                                                            | [ssspeed](https://ryanatkn.github.io/svelte-snake-sports/ssspeed)     | eat apples asap                  |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/buncheses"><img src="/static/assets/buncheses.webp" alt="logo for buncheses, macro photography of an adorable green cartoon snake with huge cute eyes next to a pile of red apples on lush green moss, realistic 3d video game, digital art, vibrant, artstation" width="192" /></a>                                     | [buncheses](https://ryanatkn.github.io/svelte-snake-sports/buncheses) | eat many whole bunches of apples |
| <a href="https://ryanatkn.github.io/svelte-snake-sports/trailsss"><img src="/static/assets/trailsss.webp" alt="logo for trailsss, macro photography of an adorable green cartoon snake with big cute eyes running towards a row of red apples in a line on lush green moss, realistic 3d video game, digital art, Pixar movie character, vibrant, artstation" width="192" /></a> | [trailsss](https://ryanatkn.github.io/svelte-snake-sports/trailsss)   | eat trails of apples             |

Here's [the source code](https://github.com/ryanatkn/svelte-snake-sports/tree/main/src/lib/sports)
for each sport.

caveats:

- it's responsive to smaller screens but mobile controls aren't great
- some of the code is still very rough from the port, I just tried to ship gameplay asap
- some of the code has experimental patterns that I wouldn't recommend

## usage

Windows users will need a Linux VM, see [this issue](https://github.com/ryanatkn/gro/issues/319).

```bash
npm run dev
# or
gro dev # npm i -g @ryanatkn/gro
```

> learn more about [SvelteKit](https://github.com/sveltejs/kit),
> [Vite](https://github.com/vitejs/vite), [Gro](https://github.com/ryanatkn/gro),
> and [Felt](https://github.com/fuz-dev/fuz)

## build

```bash
npm run build
# or
gro build
```

## deploy

[Deploy](https://github.com/ryanatkn/gro/blob/main/src/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm run deploy
# or
gro deploy
```

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
[ryanatkn.github.io/svelte-snake-sports](https://ryanatkn.github.io/svelte-snake-sports/)

## credits 🐢<sub>🐢</sub><sub><sub>🐢</sub></sub>

[Svelte](https://github.com/sveltejs/svelte) ∙
[SvelteKit](https://github.com/sveltejs/kit) ∙
[Vite](https://github.com/vitejs/vite) ∙
[esbuild](https://github.com/evanw/esbuild) ∙
[uvu](https://github.com/lukeed/uvu) ∙
[TypeScript](https://github.com/microsoft/TypeScript) ∙
[ESLint](https://github.com/eslint/eslint) ∙
[Prettier](https://github.com/prettier/prettier) ∙
[Felt](https://github.com/fuz-dev/fuz) ∙
[Gro](https://github.com/ryanatkn/gro)
& [more](package.json)

music by Alexander Nakarada
([serpentsoundstudios.com](https://www.serpentsoundstudios.com/),
[CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)):

- ["Lurking Sloth"](/static/assets/Alexander_Nakarada__Lurking_Sloth.mp3)
- ["Horde of Geese"](/static/assets/Alexander_Nakarada__Horde_of_Geese.mp3)

generated images by [DALL-E](https://wikipedia.org/wiki/DALL-E):

- [classsic](/src/lib/sports/classsic):
  "macro photography of an adorable cartoon snake with big eyes next to a red apple on lush green moss in a realistic 3d video game in the style of Tim Burton"
  - [/static/assets/classsic.webp](/static/assets/classsic.webp)
  - font is [Georgia Bold](<https://wikipedia.org/wiki/Georgia_(typeface)>)
- [ssspeed](/src/lib/sports/ssspeed):
  "macro photography of a cute cartoon snake eating a red apple on lush green moss in a 3d video game"
  - [/static/assets/ssspeed.webp](/static/assets/ssspeed.webp)
  - font is [Gabriola](<https://wikipedia.org/wiki/Gabriola_(typeface)>)
- [buncheses](/src/lib/sports/buncheses):
  "macro photography of an adorable green cartoon snake with huge cute eyes next to a pile of red apples on lush green moss, realistic 3d video game, digital art, vibrant, artstation"
  - [/static/assets/buncheses.webp](/static/assets/buncheses.webp)
  - font is [Indie Flower](https://fonts.google.com/betterspecimen/Indie+Flower)
- [trailsss](/src/lib/sports/trailsss):
  "macro photography of an adorable green cartoon snake with big cute eyes running towards a row of red apples in a line on lush green moss, realistic 3d video game, digital art, Pixar movie character, vibrant, artstation"
  - [/static/assets/trailsss.webp](/static/assets/trailsss.webp)
  - fonts are [Raleway Dots](https://fonts.google.com/specimen/Raleway+Dots)
    and [Codystar](https://fonts.google.com/specimen/Codystar)

## license [🐦](https://wikipedia.org/wiki/Free_and_open-source_software)

public domain ⚘ [The Unlicense](license)
