"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/news",
      handler: "new.addNews",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/news",
      handler: "new.getLastNews",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
