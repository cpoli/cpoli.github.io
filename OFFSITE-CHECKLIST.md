# Off-site checklist

These steps grow reach from outside this repo. Do them in order. Then check GoatCounter's `out/…` click events and the stars and downloads on the home page.

## 1. Before anything goes out

- [ ] Read and edit the three draft notes in `src/content/notes/`, then set `draft: false` and a real `date` on each one you publish. Preview them with `npm run dev`; drafts show only there.
- [ ] Check the role wording on `/projects/iguanas/` and `/projects/gators/`, and the tbee origin on `/projects/tbkit/`.

## 2. Profiles that point to the hub

- [ ] **GitHub profile README** (`cpoli/cpoli` repo): one line, with links to `https://cpoli.github.io/` and `https://cpoli.github.io/notes/`.
- [ ] **PyPI `project_urls`** in each kit's `pyproject.toml`, which takes effect at the next release:

  ```toml
  [project.urls]
  Homepage = "https://cpoli.github.io/<kit>/"
  Documentation = "https://cpoli.github.io/<kit>/"
  Source = "https://github.com/cpoli/<kit>"
  Author = "https://cpoli.github.io/"
  ```

## 3. Each note, when it is published

- [ ] **LinkedIn post**: two or three sentences, the note's figure as the image, and the note's link in the post.
- [ ] **dev.to cross-post**: paste the Markdown body and set the canonical URL in the front matter, so search engines credit the hub:

  ```yaml
  ---
  title: <same title>
  published: true
  canonical_url: https://cpoli.github.io/notes/<slug>/
  tags: python, science, opensource
  ---
  ```

  dev.to does not render `$…$` maths. Turn display equations into images or code blocks, or leave them out.

After the three launch notes, publish one note a month.

## 4. Lists (one pull request each)

- [ ] [awesome-python](https://github.com/vinta/awesome-python): add the strongest kit under the matching section. Follow its CONTRIBUTING rules, which require some traction.
- [ ] [awesome-scientific-computing](https://github.com/nschloe/awesome-scientific-computing): add physicskit, mathematicskit or tbkit under the matching heading.

## 5. Show HN (once, after the launch notes are live)

- [ ] Post "Show HN: Python toolkits that teach science through the history of its breakthroughs", linking to the hub. Post on a weekday morning, US time, and stay around to answer comments.
