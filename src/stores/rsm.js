import { ref, computed, toRaw } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRsmStore = defineStore("rsm", () => {
  const department = ref("");
  const period = ref("");
  const isEmpty = ref(false);
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
    } finally {
      isEmpty.value = rows.value.length < 1 ? true : false;
    }
  }

  async function deleteMfo(cf_ID, period_id) {
    try {
      const res = await axios.delete("/api/mfo/" + cf_ID);
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

  async function addSubMfo(newSubMfo) {
    const newSubMfo_ = Object.assign({}, newSubMfo);
    const res = await axios.post("/api/mfo/sub", newSubMfo);
    getRows(newSubMfo.period_id);
  }

  async function saveEditMfo(mfo) {
    const mfo_ = Object.assign({}, mfo);
    try {
      const res = await axios.patch("/api/mfo/" + mfo_.cf_ID, mfo_);
    } catch (error) {
      console.log("useRsmStore addNewMfo err: ", error);
    } finally {
      // getRows(newMfo.period_id);
    }
  }

  return {
    department,
    period,
    isEmpty,
    rows,
    getTitle,
    getRows,
    addNewMfo,
    deleteMfo,
    saveEditMfo,
    addSubMfo,
  };
});
