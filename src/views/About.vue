<template>
  <div class="about">
    <v-row>
      <v-col md="4" v-for="(item,index) in categories" :key="index">
        <v-card>
          <v-card-title>t goal for man city
            {{item.title}}
          </v-card-title>
           <v-card-actions>
              <v-btn
                dark               
                color="teal accent-4"
                @click="reveal = true"
              >
                Learn More
              </v-btn>
              <v-btn
                dark               
                color="teal accent-4"
                class="ml-1"
                @click="createFund()"
                
              >
                Add More
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500" persistent>
      <AddFund v-if="createFundDialog" @saveandclose="saveandclose()" @close="close()"/>
    </v-dialog>
  </div>
</template>
<script>
import AddFund from '@/components/AddFund.vue'
export default {
  name:"About",
  components:{AddFund},
  data() {
    return {
      categories:[
        {
          title:'Food',
        },
        {
          title:'Beverages',
        },
        {
          title:'Bus Rent',
        },
        {
          title:'Room Rent',
        },
      ],
      dialog: false,
      createFundDialog: false
    }
  },
  methods:{
    createFund(){
      console.log('here')
      this.dialog=true
      this.createFundDialog=true
      console.log(this.dialog)
    },
    close(){
      this.dialog= false
      this.createFundDialog = false
    },
    saveandclose(){
      this.dialog= false
      this.createFundDialog = false
    }
  }
}
</script>
