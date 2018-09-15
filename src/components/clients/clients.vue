<template>
    <div>
        <clientsCreate v-if="createClient"></clientsCreate>
        <clientsList v-if="listClient"></clientsList>
        <clientsRead v-if="readClient"></clientsRead>
    </div>
</template>
<script>
import clientsList from '@/components/clients/clients-list'
import clientsRead from '@/components/clients/clients-read'
import clientsCreate from '@/components/clients/clients-create'

export default {
  data () {
    return {
      listClient: true,
      createClient: false,
      updateClient: false,
      readClient: false
    }
  },
  components: {
    clientsList,
    clientsRead,
    clientsCreate
  }
}
</script>
<style lang="sass">

</style>
