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

  // Guardar los datos de la denuncia
  setComplaintData(data: any) {
    this.complaintData = { ...this.complaintData, ...data };
  }

  // Obtener los datos de la denuncia
  getComplaintData() {
    return this.complaintData;
  }

  // Limpiar los datos después de enviar
  clearData() {
    this.complaintData = {};
  }
}
