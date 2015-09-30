(function (riot, app) {
  app.register('factory.store', 'clicker', function (opts) {
    opts = app.apply({ interval: 500 }, opts);

    var inner = {
      clicks: 0,
      add: function () {
        inner.clicks += 1;
        inner.update();
      },
      auto: function (toggle) {
        res.running = toggle;
        inner[toggle ? 'startTimer' : 'stopTimer']();
      },
      startTimer: function () {
        clearInterval(inner.timer);
        inner.timer = setInterval(inner.add, opts.interval);
        inner.update();
      },
      stopTimer: function () {
        clearInterval(inner.timer);
        inner.update();
      },
      update: function () {
        res.resources = inner.clicks;
        res.trigger('update');
      }
    };

    var res = riot.observable({
      resources: 0,
      running: false,
      add: inner.add,
      auto: inner.auto
    });

    return res;
  });
} (window.riot, window.App));