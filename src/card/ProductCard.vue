<script lang="ts">
import { Product } from '@/model/product.model'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
    },
  },

  emits: ['add-item'],

  methods: {
    addItem(product: Product) {
      this.$emit('add-item', product)
    },
  },
})
</script>
