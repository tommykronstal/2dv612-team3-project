import { TRY_ADD_COMPANY } from './types';

export function tryAddCompany (companyDetails) {
  return {
      type: TRY_ADD_COMPANY,
      companyDetails
  };
}
