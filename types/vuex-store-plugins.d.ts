declare module 'vuex-store-plugins' {
  export function loadingPlugins(
    vuexStore: object,
    storeOptions: object,
    moduleName?: string,
    loadingPlugins?: boolean
  ): any
}
