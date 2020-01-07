import { findContent } from './content/service.js'

export default async ({ route, store }) => {
    let key = route.name
    const keys = Object.keys(route.params)
    if (keys.length) {
        key = route.params[keys[0]]
    }
    const locale = store.getters['content/selectedLocale']
    const content = store.getters['content/content'].find(content => content.key === key && content.locale === locale)
    if (!content) {
        try {
            let pageContent
            if (!keys.length) {
                pageContent = await findContent(route.name, {
                    locale
                })
            } else {
                pageContent = await findContent(route.name, {
                    slug: key,
                    locale
                })
            }
            store.commit('content/storeContent', {
                key,
                locale,
                content: pageContent
            })
        } catch (e) {
            store.commit('content/errorOccurred', e)
        }
    }
}