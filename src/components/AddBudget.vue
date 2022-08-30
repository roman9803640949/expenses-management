<template>
  <v-card>
    <v-card-title> Add Budget </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col sm="12">
          <v-text-field
            label="Title"
            outlined
            v-model="budgetData.title"
          ></v-text-field>
        </v-col>

        <v-col sm="12">
          <v-text-field
            outlined
            label="price"
            type="number"
            min="0"
            v-model="budgetData.amount"
          ></v-text-field>
        </v-col>

        <v-col xs="12">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="budgetData.date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="budgetData.date"
                label="Pick a date"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="budgetData.date"
              type="month"
              class="mt-4"
              :min="currentDate"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(budgetData.date)"
              >
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

  data() {
    return {
      budgetData: {
        title: "",
        amount: null,
        rem_amount: null,
        user_id: this.$store.getters.user.uid,
        date: new Date().toISOString().substr(0, 7),
      },
      menu: false,
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    saveandclose() {
      this.$emit("saveandclose");
      this.$store.dispatch("addBudget", { ...this.budgetData });
    },
  },

  computed: {
    currentDate() {
      return new Date().toISOString().substr(0, 7);
    },
  },
};
</script>
