import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "/api";

const API = axios.create({ baseURL: BASE_URL });

// ===== Budgets =====
export const getBudgets = () => API.get("/budgets");
export const createBudget = (data) => API.post("/budgets", data);

// ===== Departments =====
export const getDepartments = () => API.get("/departments");
export const createDepartment = (data) => API.post("/departments", data);

// ===== Projects =====
export const getProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);

// ===== Vendors =====
export const getVendors = () => API.get("/vendors");
export const createVendor = (data) => API.post("/vendors", data);

// ===== Transactions =====
export const getTransactions = (search) =>
  API.get(`/transactions${search ? "?search=" + search : ""}`);
export const createTransaction = (data) => API.post("/transactions", data);
