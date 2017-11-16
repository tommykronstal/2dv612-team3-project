import { UPDATE_COMPANY_NAME } from './types';

export function updateCompanyName (companyName) {
  return {
      type: UPDATE_COMPANY_NAME,
      companyName: companyName
  };
}

