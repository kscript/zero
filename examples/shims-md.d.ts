declare module '*.md' {
    import { VNode } from 'vue'
    function render(): VNode[]
    export interface Markdown {
        render
    }
}
