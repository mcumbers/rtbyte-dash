<div align="center">

![RTByte logo](https://rtbyte.xyz/android-chrome-192x192.png)

# RTByte Dashboard

</div>

## Description

This is the in-development Web Dashboard for the RTByte Discord Bot. It is currently considered to be in early alpha, so everything is subject to change. There will likely be a lot of placeholder assets, poor performance, and poorly--or completely unimplemented--features until such a time comes that we transition to a beta state.

### Details

This Dashboard is based on the [Materio Admin Template](https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free) by [ThemeSelection](https://themeselection.com/). It uses the [Vuetify](https://vuetifyjs.com/en/) Component Framework on top of [Vue.js 3](https://vuejs.org/). The Dashboard communicates with RTByte using [@sapphire/plugin-api](https://github.com/sapphiredev/plugins/tree/main/packages/api).

### A note regarding self-hosting RTByte

While RTByte is, and always will be, open-source, we're not very supportive of the idea of others self-hosting the bot. While you're completely free to host RTByte yourself, _you will not receive any support from us_ in doing so.

Like many other open-source Discord bots, RTByte hasn't been built with the idea of self-hosting in mind. We use many different services to ensure we're able to deliver the best solution available.

You can add RTByte to your server by visiting [rtbyte.xyz/invite].

## Development Setup

```sh
npm install --save-dev
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
