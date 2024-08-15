import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRsmStore = defineStore("rsm", () => {
  const department = ref("");
  const period = ref("");
  const rows = ref([]);

  async function getTitle(period_id) {
    try {
      const res = await axios.get("/api/rsm/title/" + period_id);
      department.value = res.data.department.department;
      period.value = res.data.period + " " + res.data.year;
    } catch (error) {
      console.log("useRsmStore getTitle err: ", err);
    }
  }

  async function getRows(period_id) {
    try {
      const res = await axios.get("/api/rsm/" + period_id);
      rows.value = res.data.rows;
    } catch (err) {
      console.log("useRsmStore getRows err: ", err);
    }
  }

  async function deleteMfo(cf_ID, period_id) {
    try {
      const res = await axios.delete("/api/mfo/" + cf_ID);
      console.log(res.data);
    } catch (error) {
      console.log("useRsmStore deleteMfo err: ", error);
    } finally {
      getRows(period_id);
    }
  }

  async function addNewMfo(newMfo) {
    try {
      const res = await axios.post("/api/mfo", {
        newMfo: newMfo,
      });
    } catch (error) {
      console.log("useRsmStore addNewMfo err: ", error);
    } finally {
      getRows(newMfo.period_id);
    }
  }

  async function saveEditMfo(mfo) {
    // console.log("saveEditMfo: ", mfo);
    try {
      const res = await axios.patch("/api/mfo/" + mfo.cf_ID, mfo);
    } catch (error) {
      console.log("useRsmStore addNewMfo err: ", error);
    } finally {
      // getRows(newMfo.period_id);
    }
  }

  return {
    department,
    period,
    rows,
    getTitle,
    getRows,
    addNewMfo,
    deleteMfo,
    saveEditMfo,
  };
});
