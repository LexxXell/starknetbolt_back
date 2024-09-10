"use strict";

module.exports = {
  async addNews(ctx) {
    const token = ctx.request.header.addnewsaccesstoken;
    if (token !== process.env.ADD_NEWS_TOKEN) {
      ctx.unauthorized("Invalid token");
      return;
    }

    const newData = {
      title: ctx.request.body.title,
      description: ctx.request.body.description,
      url: ctx.request.body.url,
      date: ctx.request.body.date,
      images: ctx.request.body.images,
      lang: ctx.request.body.lang || "en",
    };

    await strapi.entityService.create("api::new.new", {
      data: { ...newData, publishedAt: new Date() },
    });

    ctx.send("ok");
  },
  async getLastNews(ctx) {
    const limit = process.env.LAST_NEWS_LIMIT || 10;

    const lang = ctx.query.ln || "en";

    console.log(lang);

    const news = await strapi.entityService.findMany("api::new.new", {
      // @ts-ignore
      filters: { lang },
      sort: { date: "desc" },
      // @ts-ignore
      limit,
    });

    ctx.send(news);
  },
};
