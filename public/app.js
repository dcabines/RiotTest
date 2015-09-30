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
        var condition = value !== undefined && !isNaN(value);
        if (condition) obj[key] = value;
      });

      return obj;
    }
  };
} (window));