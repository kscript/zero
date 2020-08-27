<script>
import { defineComponent, ref, computed, h, watch, getCurrentInstance, onMounted } from 'vue'
import markdownIt from 'markdown-it'

export default defineComponent({

  name: 'ElMarkdown',
  
  props: {
    watches: {
      type: Array,
      default: () => ['source', 'show', 'toc'],
    },
    source: {
      type: String,
      default: ``
    },
    show: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    },
    html: {
      type: Boolean,
      default: true
    },
    xhtmlOut: {
      type: Boolean,
      default: true
    },
    breaks: {
      type: Boolean,
      default: true
    },
    linkify: {
      type: Boolean,
      default: true
    },
    emoji: {
      type: Boolean,
      default: true
    },
    typographer: {
      type: Boolean,
      default: true
    },
    langPrefix: {
      type: String,
      default: 'language-'
    },
    quotes: {
      type: String,
      default: '“”‘’'
    },
    tableClass: {
      type: String,
      default: 'table'
    },
    taskLists: {
      type: Boolean,
      default: true
    },
    toc: {
      type: Boolean,
      default: false
    },
    tocId: {
      type: String
    },
    tocClass: {
      type: String,
      default: 'table-of-contents'
    },
    tocFirstLevel: {
      type: Number,
      default: 2
    },
    tocLastLevel: {
      type: Number,
      default: 2
    },
    tocAnchorLink: {
      type: Boolean,
      default: true
    },
    tocAnchorClass: {
      type: String,
      default: 'toc-anchor'
    },
    tocAnchorLinkSymbol: {
      type: String,
      default: '#'
    },
    tocAnchorLinkSpace: {
      type: Boolean,
      default: true
    },
    tocAnchorLinkClass: {
      type: String,
      default: 'toc-anchor-link'
    },
    anchorAttributes: {
      type: Object,
      default: () => ({})
    },
    prerender: {
      type: Function,
      default: (sourceData) => { return sourceData }
    },
    postrender: {
      type: Function,
      default: (htmlData) => { return htmlData }
    },
    use: {
      type: Array,
      default() {
        return []
      }
    }
  },

  setup(props, { emit, slots }) {
    const md = new markdownIt()
    const sourceData = ref(props.source)
    const tocLastLevelComputed = computed(() => {
      return props.tocLastLevel > props.tocFirstLevel ? props.tocLastLevel : props.tocFirstLevel + 1
    })
    watch(() => props.source, (value) => {
      sourceData.value = props.prerender(value)
    })
    const instance = getCurrentInstance()
    onMounted(() => {
      const el = instance.vnode.el
      if (el) {
        sourceData.value = el.innerText || ''
        instance.update()
      }
    })
    const req = {
      emoji: 'markdown-it-emoji',
      subscript: 'markdown-it-sub',
      superscript: 'markdown-it-sup',
      footnote: 'markdown-it-footnote',
      deflist: 'markdown-it-deflist',
      abbreviation: 'markdown-it-abbr',
      insert: 'markdown-it-ins',
      mark: 'markdown-it-mark',
      toc: 'markdown-it-toc-and-anchor',
      katex: 'markdown-it-katex',
      tasklists: 'markdown-it-task-lists'
    }

    return () => {
      const reqOptions = {
        katex: { "throwOnError": false, "errorColor": " #cc0000" },
        tasklists: { enabled: props.taskLists },
        toc: {
          tocClassName: props.tocClass,
          tocFirstLevel: props.tocFirstLevel,
          tocLastLevel: tocLastLevelComputed.value,
          anchorLink: props.tocAnchorLink,
          anchorLinkSymbol: props.tocAnchorLinkSymbol,
          anchorLinkSpace: props.tocAnchorLinkSpace,
          anchorClassName: props.tocAnchorClass,
          anchorLinkSymbolClassName: props.tocAnchorLinkClass,
          tocCallback: (tocMarkdown, tocArray, tocHtml) => {
            if (tocHtml) {
              if (props.tocId && document.getElementById(props.tocId)) {
                const el = document.getElementById(props.tocId) 
                if (el) {
                  el.innerHTML = tocHtml
                }
              }
              emit('toc-rendered', tocHtml)
            }
          },
        }
      }

      const uses = props.use[0] instanceof Object ? props.use[0] : {}
      const opts = props.use[1] instanceof Object ? props.use[1] : {}
      const use = Object.keys(uses).filter(name => {
        return name === 'emoji' || name === 'toc' ? props[name] : !!req[name]
      }).map(name => {
        const options = opts[name] || reqOptions[name]
        const module = uses[name]
        return {
          options, module
        }
      })
      use.reduce((md, { module, options }) => {
        let opts = {}
        if (typeof options === 'function') {
          const result = options(props, instance)
          if (result instanceof Object) {
            opts = result
          }
        }
        return options ? md.use(module, opts) : md.use(module)
      }, md)
      md.set({
        html: props.html,
        xhtmlOut: props.xhtmlOut,
        breaks: props.breaks,
        linkify: props.linkify,
        typographer: props.typographer,
        langPrefix: props.langPrefix,
        quotes: props.quotes,
      })
      md.renderer.rules.table_open = () => `<table class="${props.tableClass}">\n`
      let defaultLinkRenderer = md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options)
        }
      md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
        Object.keys(props.anchorAttributes).map((attribute) => {
          let aIndex = tokens[idx].attrIndex(attribute)
          let value = props.anchorAttributes[attribute]
          if (aIndex < 0) {
            tokens[idx].attrPush([attribute, value]) // add new attribute
          } else {
            tokens[idx].attrs[aIndex][1] = value
          }
        })
        return defaultLinkRenderer(tokens, idx, options, env, self)
      }

      if(sourceData.value){
        let outHtml = props.show ?
          md.render(
            props.prerender(sourceData.value)
          ) : ''
        outHtml = props.postrender(outHtml)

        emit('rendered', outHtml)
        if (outHtml) {
          return h(
            'div', {
              class: 'markdown-body',
              innerHTML: outHtml
            }
          )
        }
      }
      return h(
        'div', {
          class: 'markdown-body'
      }, slots.default ? slots.default() : [])
    }
  }

})
</script>
