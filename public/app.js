(function (w) {
  var app = w.App = {
    ns: function ns(parent, name) {
      var parts = name.split('.');

      parts.forEach(function (part) {
        parent[part] = parent[part] || {};
        parent = parent[part];
      });

      return parent;
    },
    register: function (ns, key, value) {
      app.ns(app, ns)[key] = value;
    },
    apply: function (obj, config) {
      Object.keys(config || {}).forEach(function (key) {
        var value = config[key];
        var condition = value !== undefined;
        if (condition) obj[key] = value;
      });

      return obj;
    },
    addListeners: function (obj, listeners) {
      for (var l in listeners) obj.on(l, listeners[l]);
    }
  };
} (window));