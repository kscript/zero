declare module '*.md' {
    import { VNode } from 'vue'
    function render(): VNode[]
    interface Markdown {
        render
    }
}
