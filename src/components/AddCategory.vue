<template>
  <v-card>
    <v-card-title> Add Category </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="12">
          <v-text-field label="Title" outlined v-model="title"></v-text-field>
        </v-col>
        <v-col md="12">
          <v-textarea
            label="Description"
            outlined
            v-model="description"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue " depressed @click="close()"> Close </v-btn>
      <v-btn color="blue " depressed @click="saveandclose()"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddFund",

  data() {
    return {
      title: "",
      description: "",
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    saveandclose() {
      this.$emit("saveandclose");
      this.$store.dispatch("addCategory", {
        title: this.title,
        description: this.description,
        user_id: this.$store.getters.user.uid,
      });
    },
  },
};
</script>
