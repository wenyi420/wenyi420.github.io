<template>
  <div>
    <div class="item">
      {{ item.id }}
    </div>
  </div>
</template>
<script>
export default {
  name: "orderListItem",
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
};
</script>
