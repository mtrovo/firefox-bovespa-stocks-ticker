function xhr(){
    return Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].
    createInstance(Ci.nsIXMLHttpRequest);
}
var bovespaTicker = (function(){
    this.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    this.stocks = ['JHSF3', 'PETR4', 'MILK11']
    this.interval = 1000;
    this.url = "http://www.bmfbovespa.com.br/Pregao-Online/ExecutaAcaoAjax.asp?intEstado=1&CodigoPapel=";
    this.root = 'bovespa-ticker-status-bar-content'
    
    var _this = this;
    this.init = function(){
        var div = document.getElementById(this.root);
        for(var i = 0; i < _this.stocks.length; i++){
            var stock = _this.stocks[i];
            var span = document.createElement("span");
            span.stock = stock;
            div.appendChild(span);
        }
        
        alert(div.childNodes.length);
        _this.intervalId = window.setInterval(this.run, this.interval);
    };
    
    this.run = function(){
        var div = document.getElementById(this.root);
        for(var i = 0; i < div.childNodes.length; i++){
            var span = div.childNodes[i];
            if(span.stock){
                var req = xhr();  
                req.open('GET', url + span.stock, true);  
                req.span = span;
                req.onload = function (aEvt) {  
                if (req.readyState == 4) {  
                  if(req.status == 200){
                    var xml = aEvt.target.responseXML.documentElement;
                    if (xml && "parseerror" != xml.tagName){
                        var papel = xml.getElementsByTagName("Papel")[0];
                        var text = papel.getAttribute("Codigo");
                        text += " ";
                        text += papel.getAttribute("Ultimo");
                        
                        var indexOf = papel.getAttribute("Oscilacao").indexOf('-');
                        this.span.innerHTML = text;
                        this.span.className = indexOf == 0 ? "stockoscd" : "stockoscu";
                    }
                  } //else Firebug.console.info("error " + req.status);  
                } // else Firebug.console.info("readyState != 4: " + req.status);
                this.span = null;
                };
                req.send(null); 
            }
        }
    };
    return this;
})();
window.addEventListener("load", bovespaTicker.init, false);