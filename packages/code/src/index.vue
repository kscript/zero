<template>
    <div class="el-code line-numbers" :class="'el-code-' + mode">
        <pre data-manual class="el-code-lines line-numbers" :class="'language-' + type" :data-start="start">
            <code v-html="code"></code>
        </pre>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min'
// @ts-ignore
// Prism.languages.html.br = /\n/

export default defineComponent({
    name: 'ElCode',
    props: {
        mode: {
            type: String,
            default: 'block'
        },
        type: {
            type: String,
            default: 'html'
        },
        start: {
            type: Number,
            default: 1
        },
        trim: {
            type: Number,
            default: 0
        }
    },
    setup(props, cxt) {
        const code = ref('')
        onMounted(() => {
            const slot = cxt.slots.default ? cxt.slots.default() : []
            let html = (slot[0]?.children || '') as string
            const lines = html.split('\n')
            if (props.trim) {
                const start = (lines.length + props.trim) % lines.length
                const str = ((lines.slice(start, start + 1)[0] || '').match(/\s+/) || [''])[0]
                if (str) {
                    html = lines.map(line => {
                        if (line.slice(0, str.length) === str) {
                            return line.slice(str.length)
                        }
                        return line
                    }).join('\n')
                }
            }
            const instance = getCurrentInstance() as ComponentInternalInstance 
            // @ts-ignore
            code.value = Prism.highlight(html, Prism.languages[props.type], props.type)
        })
        return {
            code
        }
    }
})
</script>

<style lang="scss">
@import 'theme/code.scss';
</style>
