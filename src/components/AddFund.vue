<template>
<v-card>
  <v-card-title>
    Add Expenses
  </v-card-title>
  <v-card-text>
    <v-row>
      <v-col md=12>
         <v-text-field
            label="Title"
            outlined
          ></v-text-field>
      </v-col>
      <v-col md=12>
         <v-text-field
            label="Price"
            outlined
            type="number"
            min="0"
          ></v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue "
            depressed
            @click="close()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue "
            depressed
            @click="saveandclose()"
          >
            Save
          </v-btn>
        </v-card-actions>
</v-card>
</template>

<script>
  export default {
    name: 'AddFund',
    methods:{
      close(){
        this.$emit('close')
      },
      saveandclose(){
        this.$emit('saveandclose')
      }
    }
  }
</script>
