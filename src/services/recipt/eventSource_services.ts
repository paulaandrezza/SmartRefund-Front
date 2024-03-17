import {
  AllReceiptDataType,
  ReceiptDataType,
} from "@/types/refund/EventSourceType";
import { AxiosPromise } from "axios";
import { api } from "../api";

export const EventSourceServices = {
  getAllReceipts(): AxiosPromise<AllReceiptDataType> {
    return api.get(`/events/front`);
  },

  getReceiptByHash(hash: string): AxiosPromise<ReceiptDataType> {
    return api.get(`events/${hash}/front`);
  },
};
