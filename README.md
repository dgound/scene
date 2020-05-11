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
The graph was created using the pyvis python library. The output was post-produced using HTML5 and CSS3.


./SCENE is a work in progress. If you would like to submit info for additional bands or provide feedback/corrections/etc, please write to: dgkounta (at) gmail (dot) com.

Dimos Goundaroulis, May 2020, Houston TX USA.
