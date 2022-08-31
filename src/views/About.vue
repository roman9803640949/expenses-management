<template>
  <div class="about">
    <v-row justify="end">
      <v-col md="4"> </v-col>

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
      <v-col md="5">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="true"
          transition="scale-transition"
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFilter"
              label="Select the month"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
              dense
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateFilter" type="month" class="mt-4">
            <v-spacer></v-spacer>
          </v-date-picker> </v-menu
      ></v-col>

      <v-col md="12">
        <v-chip small color="success">
          Budget: Rs {{ budget?.amount || 0 }}
        </v-chip>
        <v-chip small color="error"> Used Amount: Rs {{ usedAmount }} </v-chip>
        <v-chip small color="warning">
          Remaining Amount: Rs {{ remainingAmount }}
        </v-chip>
        <!-- 
        <v-chip small color="primary" @click="deleteBudget"
          >Clear Budget
        </v-chip> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" v-for="(cat, index) in newCategoriesList" :key="index">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-col md="3">
                  {{ cat.title }}
                </v-col>
                <v-col md="9">
                  <v-chip class="mx-2" color="green" small text-color="white">
                    RS {{ cat.total || 0 }}
                  </v-chip>
                  <v-btn
                    small
                    dark
                    color="primary accent-4"
                    class="ml-1"
                    @click="createFund(cat)"
                    v-if="budget?.amount"
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cat.sub_categories" :key="item.id">
                      <td class="text-left">{{ item.title }}</td>
                      <td class="text-left">{{ item.price }}</td>
                      <td class="text-left">
                        <v-icon
                          small
                          color="red"
                          @click="deleteSubCategory(item)"
                          >mdi-delete</v-icon
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col md="12">
        <Pie
          :label="categoryChartLabel"
          :datas="categoryChartData"
          :colors="getRandomColor"
          v-if="categoryChartData.length && categoryChartLabel.length"
        />
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
import Pie from "../components/Pie.vue";
export default {
  name: "About",
  components: { AddFund, AddCategory, AddBudget, Pie },

  data() {
    return {
      dateFilter: new Date().toISOString().substr(0, 7),
      dialog: false,
      createFundDialog: false,
      createCategoryDialog: false,
      createBudgetDialog: false,
      categoryId: null,
      menu: false,
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

    deleteSubCategory(item) {
      this.$store.dispatch("deleteSubCategory", item);
    },

    deleteBudget() {
      this.$store.dispatch("deleteBudget", this.dateFilter);
    },
  },

  computed: {
    categories() {
      return this.$store.getters.categories;
    },

    currentDate() {
      return this.dateFilter;
    },

    newCategoriesList() {
      return [...this.categories].map((cat) => {
        return {
          ...cat,
          sub_categories: this.new_sub_categories[cat.id],
          total: this.new_sub_categories[cat.id]?.reduce(
            (a, b) => ~~a + ~~b.price,
            0
          ),
        };
      });
    },

    sub_categories() {
      return this.$store.getters.sub_categories.filter(
        (item) => item.date == this.currentDate
      );
    },
    new_sub_categories() {
      return this.sub_categories?.reduce((acc, obj) => {
        const key = obj["category_id"];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    },

    usedAmount() {
      return this.sub_categories.reduce((a, b) => ~~a + ~~b.price, 0);
    },

    remainingAmount() {
      return ~~this.budget?.amount - ~~this.usedAmount;
    },

    budget() {
      let length = this.$store.getters.budget.length - 1;
      return this.$store.getters.budget.filter(
        (item) => item.date == this.currentDate
      )[length];
    },

    categoryChartData() {
      return this.newCategoriesList.map((item) => item.total);
    },
    getRandomColor() {
      //generates random colours and puts them in string
      var colors = [];
      for (var i = 0; i < this.categories.length + 1; i++) {
        var letters = "0123456789ABCDEF".split("");
        var color = "#";
        for (var x = 0; x < 6; x++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
      }
      colors = colors.slice(0, -1);
      console.log(colors);
      return colors;
    },

    categoryChartLabel() {
      return this.newCategoriesList.map((item) => item.title);
    },
  },
};
</script>
