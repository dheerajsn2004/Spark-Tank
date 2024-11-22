import axios, { AxiosResponse } from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:5000';

// Axios instance for making requests
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the types for the team and transaction data
interface Team {
  _id: string;
  name: string;
  wallet: number;
  availableShares: number;
}

interface TransactionData {
  purchasingTeamId: string;
  sellingTeamId: string;
  sharesToBuy: number;
  costPerShare: number;
}

interface TransactionLog {
  purchasingTeamId: string;
  sellingTeamId: string;
  sharesBought: number;
  costPerShare: number;
  totalCost: number;
}

// Function to fetch a team by ID
export const fetchTeamById = (teamId: string): Promise<AxiosResponse<Team>> => {
  return axiosInstance.get<Team>(`/teams/${teamId}`);
};

// Function to create a team
export const createTeam = (teamData: { name: string; wallet: number; availableShares: number }): Promise<AxiosResponse<Team>> => {
  return axiosInstance.post<Team>('/teams', teamData);
};

// Function to buy shares
export const buyShares = (transactionData: TransactionData): Promise<AxiosResponse<TransactionLog>> => {
  return axiosInstance.post<TransactionLog>('/transactions/buy', transactionData);
};

// Function to fetch transaction logs for a team
export const fetchTransactionLogsForTeam = (teamId: string): Promise<AxiosResponse<TransactionLog[]>> => {
  return axiosInstance.get<TransactionLog[]>(`/transactions/logs/${teamId}`);
};
