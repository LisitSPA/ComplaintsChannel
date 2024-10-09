import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplaintDataService {
  private complaintData: any = {
    reasons: [],
    isAnonymous: true,
    description: '',
    incidentDate: '',
    personInvolveds: [],
    complainant: {
      rut: '',
      names: '',
      lastName: '',
      eCompanyStatus: 1,
      position: '',
      area: '',
      eGenre: 1,
      contactPhone: ''
    },
    contactEmail: ''
  };

  setComplaintData(data: any) {
    this.complaintData = { ...this.complaintData, ...data };
  }

  getComplaintData() {
    return this.complaintData;
  }

  clearData() {
    this.complaintData = {};
  }
}
