# Hugo Minimal Artist

> Infinite scrolling art blog theme.

## Demo

[Example Site](https://hugo-minimal-artist.netlify.app)

## Live Sites

- [Kitsunebi](https://kitsunebi.app/)
- [Ditdoo](https://ditdoo.com/)

## Introduction 

Minimal Artist is a lightweight art blog theme, some of its features are:

- Infinite Scrolling
- Gallery Lightbox
- Automated Photo Resizing
- Customizable Colors, Logo, and Background
- Minimal JavaScript
- No JavaScript Libraries
- No CSS Framework
- Optional Text Fields
- Optional Google Analytics

## Requirements

It is necessary to use **Hugo Extended ≥ 0.87.0.**

## Installation

Clone / Download this repository to `theme` folder, and edit your site config according to `exampleSite/config.yaml`.

## Configuration

Set `params` of `config.toml` to your liking.

Example:
```
[params]                     # all params must be strings!
  subtitle = "foo"           # text that goes below title
  gtag = "G-ABCDEFGHIJ"      # optionally set a google analytics id
  fontSize = "16"            # font size in pixels
  mainMaxWidth = "36"        # post width in em
  resizeQuality = "90"       # image resize quality in percent
  colorBG = "#000c1a"        # hex of background color
  colorPost = "#001935"      # hex of post color
  colorRegular = "#c0c7d1"   # hex of most text
  colorImportant = "#e6ecf3" # hex of important text
  colorHighlight = "#ff3db4" # hex of hover text
```

favicon is set by saving `favicon.ico` and/or `favicon.png` in the `content/` directory.

Site logo and header background can also be set by saving an image file in `content/`.
  - logo file must be named `avatar.webp`, `avatar.png`, or `avatar.jpg`
  - header background must be named `bg.webp`, `bg.png`, or `bg.jpg`

## Copyright

Licensed under [BSD 3-Clause](LICENSE).

Please do not remove "*Theme designed by Mark Esler*" text and link.
