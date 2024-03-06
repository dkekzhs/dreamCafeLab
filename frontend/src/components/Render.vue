<template>
    <div id="renderDiv"></div>
</template>

<script>

import { Renderer } from "@/js/renderer.js";
import { onMounted } from "vue";


export default {
  setup() {
    onMounted(() => {    
        console.log("hi");
        let renderDiv = document.getElementById("renderDiv");
        let renderer = new Renderer(renderDiv, "render");
        
        console.log("bye");
    });
  }
}

</script>

