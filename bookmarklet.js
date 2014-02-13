var replacePlayer = function(rootNode){

  var matchMegavisor = /^(.*)http[s]?:\/\/megavisor.com\/(?:[a-z]+\/)?view\/([a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)(.*)$/m;

  var iframeConstructor = function(uuid, beforeText, afterText){
    var df = document.createDocumentFragment();

    var iframe = document.createElement("iframe");
    iframe.src= "http://media.megavisor.com/player/embed?" + uuid;
    iframe.setAttribute("width", '640');
    iframe.setAttribute("height", '480');
    iframe.setAttribute("frameborder", '0');
    iframe.setAttribute("webkitAllowFullscreen");
    iframe.setAttribute("allowFullscreen");

    beforeText && df.appendChild(document.createTextNode(beforeText));
    df.appendChild(iframe);
    afterText && df.appendChild(document.createTextNode(afterText));

    return df;
  };

  var checkParentContentEditable = function(node){
    var po = node;
    while(po.parentNode){
      if(po.contentEditable === "true"){
        return true;
      }
      po = po.parentNode;
    }
    return false;
  };

  var nodeIterator = document.createNodeIterator(
    rootNode,
    NodeFilter.SHOW_TEXT,
      { acceptNode: function(node) {
        if ( ! /^\s*$/.test(node.data) ) {
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    },
    false
  );

  var node, nodesToProcess = [];
  while(node = nodeIterator.nextNode()){
    if(matchMegavisor.test(node.data)){
      if( !checkParentContentEditable( node ) ){
        nodesToProcess.push(node);
      }
    }
  }

  var links = document.getElementsByTagName("a");
  for(var i=0, len = links.length; i!=len; i++){
    if( !checkParentContentEditable( links[i] ) ){
      nodesToProcess.push(links[i]);
    }
  }

  while(node = nodesToProcess.pop()){
    if(node.nodeType == 3){
      var uuid = node.data.match(matchMegavisor);
      if(uuid && uuid[2]){
        node.parentNode.replaceChild(iframeConstructor(uuid[2], uuid[1], uuid[3]), node);
      }
    }else if(node.nodeType == 1){
      var uuid = node.href.match(matchMegavisor);
      if(uuid && uuid[2]){
        node.parentNode.replaceChild(iframeConstructor(uuid[2]), node);
      }
    }
  }

};