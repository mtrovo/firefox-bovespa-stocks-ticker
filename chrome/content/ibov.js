var bovespaTicker = (function(){
    this.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    
    this.init = function(){
        window.setInterval(function(){
            document.getElementById("");
        });
    };
    this.run = function(){};
    return this;
})();
window.addEventListener("load", bovespaTicker.init, false);