<template>
  <div>
    <h1>title</h1>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const title = ref("Vite");

    return {
      title,
    };
  },
});
</script>
