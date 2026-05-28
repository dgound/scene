# ./SCENE: A data-driven archive

./SCENE is an attempt at archiving the Greek underground music scene using a data-driven approach.

Visit ./SCENE at: https://dgound.github.io/scene/index.html

Method
------

### Graph:
The scene is modelled as a graph where each node of the graph represents a band. For the moment, only bands that have at least one EP released are considered. 

### Nodes and edges:
An edge is placed between two nodes if they share at least one band member (either as a full-time member or a guest at an official release).

### Weights:
Edges are weighted based on the number of members that are shared between two bands. Thicker edges correspond to larger number of common members between the two bands.
Nodes are weighted by the number of neighbors. Larger nodes correspond to bands that have larger number of collaborations/side-projects.

### Tools:
The initial graph was generated with the [pyvis](https://pyvis.readthedocs.io/) Python library, which produces a [vis-network](https://visjs.github.io/vis-network/docs/network/) HTML scaffold. The nodes and edges were extracted into a standalone `data/scene.js` file (exposed as `window.SCENE_DATA`) so they can be edited without touching markup. The rest of the site — layout, search, loading state, themed tooltip, and dark UI — is hand-written HTML, CSS, and vanilla JavaScript, with IBM Plex Mono and Inter via Google Fonts. vis-network is loaded from CDN with SRI integrity hashes.

Project layout
--------------

```
index.html       graph page
about.html       about page
styles.css       shared styles
data/scene.js    nodes + edges (defines window.SCENE_DATA so file:// works)
js/header.js     shared header (rendered into <header data-shared>)
js/graph.js      vis-network bootstrap, popup, search, loading bar
```

To update the archive, edit the data inside `data/scene.js` (after `window.SCENE_DATA = `) directly — no HTML changes needed — or regenerate from pyvis and re-extract.


./SCENE is a work in progress. If you would like to submit info for additional bands or provide feedback/corrections/etc, please write to: dgkounta (at) gmail (dot) com.

Dimos Goundaroulis, May 2020, Houston TX USA.
