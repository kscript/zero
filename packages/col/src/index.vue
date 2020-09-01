<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance, computed, h, PropType } from 'vue'
export default defineComponent({
  name: 'ElCol',

  props: {
    span: {
      type: Number as PropType<Number>,
      default: 24
    },
    tag: {
      type: String as PropType<String>,
      default: 'div'
    },
    offset: Number as PropType<Number>,
    pull: Number as PropType<Number>,
    push: Number as PropType<Number>,
    size: [String, Number] as PropType<String|Number>,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  setup(props, cxt) {
    const instance = getCurrentInstance() as ComponentInternalInstance 
    const gutter = computed(() => {
      let parent = instance.parent;
      while (parent && parent.type.name !== 'ElRow') {
        parent = parent.parent;
      }
      return parent ? parent.type.props.gutter : 0;
    })
    return () => {
      let classList: string[] = [];
      let style: anyObject = {};

      if (gutter.value) {
        style.paddingLeft = gutter.value / 2 + 'px';
        style.paddingRight = style.paddingLeft;
      }
      const {span, offset, pull, push} = props
      const data: anyObject<Number|void> = {span, offset, pull, push}
      const moves = ['span', 'offset', 'pull', 'push']
      moves.forEach(prop => {
        if (data[prop] || data[prop] === 0) {
          classList.push(
            prop !== 'span'
              ? `el-col-${prop}-${data[prop]}`
              : `el-col-${props[prop]}`
          )
        }
      })
      type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as Sizes[]
      sizes.forEach(size => {
        const curr = props[size] as anyObject
        if (typeof curr === 'number') {
          classList.push(`el-col-${size}-${curr}`);
        } else if (typeof curr === 'object') {
          Object.keys(curr).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `el-col-${size}-${prop}-${curr[prop]}`
                : `el-col-${size}-${curr[prop]}`
            );
          });
        }
      });

      return h(props.tag, {
        class: ['el-col', classList],
        style
      }, cxt.slots.default?.() || []);
    }
  }

})
</script>

<style lang="scss">
@import 'theme/col.scss';
</style>

