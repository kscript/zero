import { ComponentInternalInstance, Ref } from "vue"

export interface Carousel {
  items: Ref<ComponentInternalInstance[]>,
  updateItems: () => void;
  setActiveItem: (index: number) => void;
  type: string;
  loop: boolean;
  direction: 'horizontal' | 'vertical';
  mountChildren: (instance: ComponentInternalInstance) => void;
}