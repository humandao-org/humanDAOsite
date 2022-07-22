import { atom } from "recoil";

export const affiliateState = atom({
  key: 'AffiliateData',
  default: {
    affiliateId: ''
  },
});