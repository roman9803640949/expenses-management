<template>
  <v-card>
    <v-card-title> Add Expenses </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="12">
          <v-text-field label="Title" outlined v-model="title"></v-text-field>

          <v-text-field
            label="Price"
            outlined
            type="number"
            min="0"
            v-model="price"
          ></v-text-field>

          <v-textarea
            label="Description"
            v-model="description"
            outlined
          ></v-textarea>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Pick a date"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              type="month"
              class="mt-4"
              :min="currentDate"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
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

  props: ["categoryId"],

  methods: {
    close() {
      this.$emit("close");
    },
    saveandclose() {
      this.$emit("saveandclose");
      this.$store.dispatch("addSubCategory", {
        title: this.title,
        price: this.price,
        description: this.description,
        date: this.date,
        category_id: this.categoryId,
        user_id: this.$store.getters.user.uid,
      });
    },
  },

  data() {
    return {
      title: "",
      price: null,
      description: "",
      date: new Date().toISOString().substr(0, 7),
      menu: false,
    };
  },

  computed: {
    currentDate() {
      return new Date().toISOString().substr(0, 7);
    },
  },
};
</script>
