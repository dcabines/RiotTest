(function (riot, app) {
  app.register('factory.store', 'clicker', function (opts) {
    opts = app.apply({ interval: 500 }, opts);

    var inner = {
      clicks: 0,
      add: function () {
        inner.clicks += 1;
        res.resources = inner.clicks;
        res.trigger('update');
      },
      auto: function (toggle) {
        res.running = toggle;
        inner[toggle ? 'startTimer' : 'stopTimer']();
      },
      startTimer: function () {
        clearInterval(inner.timer);
        inner.timer = setInterval(inner.add, opts.interval);
        res.interval = inner.interval();
        res.trigger('update');
      },
      stopTimer: function () {
        clearInterval(inner.timer);
        res.interval = '0.0';
        res.trigger('update');
      },
      interval: function () {
        var interval = inner.msToPerSec(opts.interval);
        return interval.toFixed(1);
      },
      msToPerSec: function (ms) {
        return 1 / (ms / 1000);
      }
    };

    var res = riot.observable({
      interval: '0.0',
      resources: 0,
      running: false,
      add: inner.add,
      auto: inner.auto
    });

    app.addListeners(res, opts.listeners);

    return res;
  });
} (window.riot, window.App));