<template>
   <div> {{ count }}</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            count : 'countNumber/count',
        })
    }
}
</script>
