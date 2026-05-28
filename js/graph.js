(function () {
  var nodes, edges, network;

  // Options kept close to the pyvis-original. Visual tweaks (node color, edge
  // color) are applied per-item below rather than via global option overrides,
  // which previously caused the layout to drift after stabilization.
  var options = {
    configure: { enabled: false },
    edges: {
      color: { inherit: true },
      smooth: { enabled: false, type: 'continuous' }
    },
    interaction: {
      dragNodes: true,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false
    },
    physics: {
      barnesHut: {
        avoidOverlap: 0,
        centralGravity: 0.3,
        damping: 0.09,
        gravitationalConstant: -80000,
        springConstant: 0.001,
        springLength: 250
      },
      enabled: true,
      stabilization: {
        enabled: true,
        fit: true,
        iterations: 1000,
        onlyDynamicEdges: false,
        updateInterval: 50
      }
    }
  };

  function buildPopup(container) {
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.setAttribute('role', 'tooltip');
    var popupTimeout = null;
    popup.addEventListener('mouseover', function () {
      if (popupTimeout !== null) {
        clearTimeout(popupTimeout);
        popupTimeout = null;
      }
    });
    popup.addEventListener('mouseout', hidePopup);
    container.appendChild(popup);

    function hidePopup() {
      popupTimeout = setTimeout(function () { popup.style.display = 'none'; }, 500);
    }

    function showPopup(nodeId) {
      var nodeData = nodes.get([nodeId]);
      if (!nodeData[0]) return;
      popup.innerHTML = nodeData[0].title;
      var posCanvas = network.getPositions([nodeId])[nodeId];
      var box = network.getBoundingBox(nodeId);
      posCanvas.x = posCanvas.x + 0.5 * (box.right - box.left);
      var posDOM = network.canvasToDOM(posCanvas);
      posDOM.x += 10;
      posDOM.y -= 20;
      popup.style.display = 'block';
      popup.style.top = posDOM.y + 'px';
      popup.style.left = posDOM.x + 'px';
    }

    network.on('showPopup', showPopup);
    network.on('hidePopup', hidePopup);
  }

  function wireLoadingBar() {
    var bar = document.getElementById('bar');
    var text = document.getElementById('text');
    var loadingBar = document.getElementById('loadingBar');
    if (!bar || !text || !loadingBar) return;

    network.on('stabilizationProgress', function (params) {
      var pct = Math.round((params.iterations / params.total) * 100);
      bar.style.width = pct + '%';
      text.textContent = 'stabilizing · ' + pct + '%';
    });
    network.once('stabilizationIterationsDone', function () {
      bar.style.width = '100%';
      text.textContent = 'ready';
      loadingBar.style.opacity = 0;
      setTimeout(function () { loadingBar.style.display = 'none'; }, 400);
    });
  }

  function wireSearch() {
    var input = document.getElementById('search');
    var listId = 'band-list';
    var list = document.getElementById(listId);
    if (!input || !list) return;

    var ids = nodes.getIds().slice().sort(function (a, b) {
      return String(a).localeCompare(String(b));
    });
    var frag = document.createDocumentFragment();
    ids.forEach(function (id) {
      var opt = document.createElement('option');
      opt.value = id;
      frag.appendChild(opt);
    });
    list.appendChild(frag);

    function focusBand(name) {
      if (!name) return;
      var node = nodes.get(name);
      if (!node) return;
      network.selectNodes([name]);
      network.focus(name, { scale: 1.2, animation: false });
    }

    input.addEventListener('change', function () { focusBand(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') focusBand(input.value);
    });
  }

  function drawGraph(payload) {
    var container = document.getElementById('mynetwork');
    nodes = new vis.DataSet(payload.nodes);
    edges = new vis.DataSet(payload.edges);
    network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
    window.network = network; // debug handle
    buildPopup(container);
    wireLoadingBar();
    wireSearch();
    var meta = document.getElementById('search-meta');
    if (meta) meta.textContent = payload.nodes.length + ' bands · ' + payload.edges.length + ' edges';
  }

  function showError(msg) {
    var container = document.getElementById('mynetwork');
    if (!container) return;
    container.textContent = msg;
    container.style.color = '#fff';
    container.style.padding = '2rem';
  }

  if (window.SCENE_DATA) {
    drawGraph(window.SCENE_DATA);
  } else {
    showError('Could not load scene data: data/scene.js missing.');
  }
})();
