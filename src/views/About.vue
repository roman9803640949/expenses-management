<template>
  <div class="about">
    <v-row justify="end">
      <v-col md="2">
        <v-btn
          large
          color="primary"
          class="float-right mt-5"
          dark
          @click="createCategory"
          >Add category</v-btn
        >
      </v-col>

      <v-col md="2">
        <v-btn
          large
          color="primary"
          class="float-right mt-5"
          dark
          @click="createBudget"
          >Add Budget</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" v-for="(cat, index) in newCategoriesList" :key="index">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-col md="6">
                  {{ cat.title }}
                </v-col>
                <v-col md="6">
                  <v-chip
                    class="mx-2"
                    color="green"
                    small
                    text-color="white"
                  >
                   RS  {{cat.total}}
                  </v-chip>
                  <v-btn
                    small
                    dark
                    color="primary accent-4"
                    class="ml-1"
                    @click="createFund(cat)"
                  >
                    Add Expenses
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cat.sub_categories" :key="item.id">
                      <td class="text-left">{{ item.title }}</td>
                      <td class="text-left">{{ item.price }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500" persistent>
      <AddFund
        v-if="createFundDialog && categoryId"
        @saveandclose="saveandclose()"
        @close="close()"
        :categoryId="categoryId"
      />

      <AddCategory
        v-if="createCategoryDialog"
        @saveandclose="saveandclosecategory()"
        @close="close()"
      />

      <AddBudget
        v-if="createBudgetDialog"
        @saveandclose="saveandclosebudget()"
        @close="close()"
      />
    </v-dialog>
  </div>
</template>
<script>
import AddFund from "@/components/AddFund.vue";
import AddCategory from "@/components/AddCategory.vue";
import AddBudget from "@/components/AddBudget.vue";
export default {
  name: "About",
  components: { AddFund, AddCategory, AddBudget },

  data() {
    return {
      dialog: false,
      createFundDialog: false,
      createCategoryDialog: false,
      createBudgetDialog: false,
      categoryId: null,
    };
  },

  methods: {
    createFund({ id }) {
      this.categoryId = id;
      this.dialog = true;
      this.createFundDialog = true;
    },
    createBudget() {
      this.dialog = true;
      this.createBudgetDialog = true;
    },

    createCategory() {
      this.dialog = true;
      this.createCategoryDialog = true;
      console.log(this.dialog);
    },

    close() {
      this.dialog = false;
      this.createFundDialog = false;
      this.createCategoryDialog = false;
    },

    saveandclose() {
      this.dialog = false;
      this.createFundDialog = false;
    },

    saveandclosecategory() {
      (this.dialog = false), (this.createCategoryDialog = false);
    },
    saveandclosebudget() {
      (this.dialog = false), (this.createBudgetDialog = false);
    },
  },

  computed: {
    categories() {
      return this.$store.getters.categories;
    },

    newCategoriesList() {
      return [...this.categories].map((cat) => {
        return {
          ...cat,
          sub_categories: this.new_sub_categories[cat.id],
          total: this.new_sub_categories[cat.id].reduce((a,b)=> ~~a + ~~b.price,0),
        };
      });
    },

    sub_categories() {
      return this.$store.getters.sub_categories;
    },
    new_sub_categories() {
      return this.sub_categories.reduce((acc, obj) => {
      const key = obj['category_id'];
      if (!acc[key]) {
         acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
   }, {});
    },
  },
};
</script>
