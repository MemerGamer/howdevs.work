---
title: Hogyan hozta létre a howdevs.work blogot
description: Egy őszinte beszámoló arról, hogyan született meg ez a többnyelvű fejlesztői blog Astro, Starlight és modern webes eszközök segítségével.
date: 2025-11-11
authors:
  - memergamer
  - howdevs
excerpt: A howdevs.work születésének története – a technológiai döntésektől a többnyelvű tartalomig.
tags:
  - astro
  - starlight
  - web-fejlesztés
  - i18n
---

# Hogyan hoztam létre a howdevs.work blogot

Egy blog készítése manapság egyszerűnek tűnhet, nem? Hát igen is, meg nem is. Persze összedobhatnánk egy WordPress oldalt pár perc alatt, de valljuk be, mint fejlesztők, hogy vannak erre szebb megoldások. Szeretjük a teljesítményt, a kontrollt, és határozottan Markdownban akarunk írni.

Így kötöttem ki végül az Astro és Starlight kombójánál a howdevs.work építésekor.

## Miért az Astro + Starlight?

Bevallom őszintén, végigmentem a szokásos "framework értékelési" folyamaton. Tudod, mikor három hetet töltesz azzal, hogy a tökéletes stacket kutatod, ahelyett hogy építenéd a dolgot.

De az Astro tényleg értelmes választásnak tűnt ehhez a projekthez:

- **Alapból gyors** – Minimális JavaScriptet, ami gyors oldalbetöltést jelent
- **Tartalomcentrikus** – Pontosan ilyen oldalakra tervezték
- **Rugalmas** – Ha később kell, be tudok dobni React komponenseket

A Starlight volt az igazi fordulópont. Mintha valaki fogta volna a dokumentációs oldal építésének összes unalmas részét (navigáció, keresés, i18n, témázás) és megoldotta volna.

## A többnyelvű kihívás

Ez volt a trükkös rész. Azt akartam, hogy a blog angol és magyar nyelven is működjön, de nem akartam két külön oldalt karbantartani.

A Starlight i18n támogatása pont az volt, amire szükségem volt. A beállítás meglepően egyértelmű:

- Az angol posztok a `src/content/docs/en/blog/` mappában vannak
- A magyar posztok tükrözik őket a `src/content/docs/hu/blog/` mappában
- Az útvonalak automatikusan generálódnak: `/en/blog/poszt-cime/` és `/hu/blog/poszt-cime/`

Ha nincs kész magyar fordítás, elegánsan visszaesik angolra. Nincs nem működő link, nincsenek összezavart felhasználók.

## A blog plugin varázslatai

Itt lettek igazán szépek a dolgok. Ahelyett hogy magam építettem volna fel az összes blog funkciót, használtam a `starlight-blog` plugint. Ez egy életmentő dolog, mert ad neked:

- Automatikus posztlistázást
- Szerzői oldalakat (megfelelő metaadatokkal)
- Címke szerinti szűrést
- RSS feedeket
- Tiszta oldalsávot a legutóbbi posztokkal

A szerzők beállítása különösen elegáns volt. Ahelyett hogy minden posztban hardkódolnád a szerző infóit, egyszer definiálod őket a configban:

```ts
starlightBlog({
  authors: {
    memergamer: {
      name: "Kovács Bálint-Hunor",
      title: "Fejlesztő és karbantartó",
      picture: "https://avatars.githubusercontent.com/u/28981854?v=4",
      url: "https://www.kovacsbalinthunor.com",
    },
  },
});
```

Aztán a posztok csak hivatkoznak a slugra: `authors: [memergamer]`. Tiszta és karbantartható.

## A tartalom workflow

Az Astro Content Collections-t használom, ami TypeScript validációt ad a frontmatterhez. Ez azt jelenti, hogy ha elrontom a dátum formátumot vagy elfelejtem a címkéket, build időben megtudhatom.

A séma kiegészíti a Starlight beépített validációját blog-specifikus mezőkkel:

```ts
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: (context) => blogSchema(context),
  }),
});
```

Ez az a fajta beállítás, ami egyszerűen működik és nem áll az utadba.

## Funkciók, amik maguktól működnek

Néhány dolog, ami órákig tartott volna nulláról felépíteni:

- **Szintaxiskiemelés** Shiki-vel (a sötét témához konfigurálva)
- **Mermaid diagramok** amikor architektúrát kell magyaráznom
- **Teljes szöveges keresés** Pagefind-dal
- **Sötét mód** ami tiszteletben tartja a rendszerbeállításokat
- **Reszponzív dizájn** ami tényleg működik mobilon

## Mit tanultam

A legnagyobb meglepetés az volt, mennyi időt _nem_ töltöttem build eszközök konfigurálásával. A webpack-nehéz beállítások után az Astro "egyszerűen működik" megközelítése szinte gyanúsnak tűnt. De pont ez a lényeg, azt engedi, hogy az írásra koncentrálj, ne az eszközök konfigurálásával töltsd az időt.

A plugin ökoszisztéma is megbízható. Ahelyett hogy újra feltaláltam volna a kereket a blog funkciókért, tudtam meglévő megoldásokat használni és a tartalomra koncentrálni.

## Mi a projekt jövője?

Néhány ötlet motoszkál bennem:

- Kapcsolódó posztok javaslata
- Olvasási idő becslések
- Talán néhány interaktív komponens tutorialokhoz
- Vendégszerző funkció

De őszintén? A jelenlegi beállítás pontosan azt csinálja, amire szükségem van. Néha a legjobb architektúra az, amire nem kell gondolnod.

## Szeretnél hozzájárulni?

Az egész oldal nyílt forráskódú. Ha van egy fejlesztői történeted, amit meg akarsz osztani, nézd meg a [hozzájárulási útmutatónkat](/hu/blog/how-to-contribute/)!
