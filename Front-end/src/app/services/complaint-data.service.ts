import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplaintDataService {
  
  private resons: any = {}

  private complaintData: any = {
    reasons: [],
    isAnonymous: true,
    description: '',
    incidentDate: '',
    personInvolveds: [],   
    contactEmail: ''
  };

  private complainant: any = {   
      rut: '',
      names: '',
      lastName: '',
      eCompanyStatus: 1,  
      position: '',
      area: '',
      eGenre: 1,
      contactPhone: ''    
  }

  setComplaintData(data: any) {
    this.complaintData = { ...this.complaintData, ...data };
   
    if(!this.complaintData.isAnonymous)
      this.complaintData.complainant = { ...this.complainant, ...data.complainant };
    
    console.log('Datos actualizados en ComplaintDataService:', this.complaintData);
  }

  setId(id: number){
    this.complaintData.Id = id;
  }

  getComplaintData() {
    return this.complaintData;
  }

  getReasons(){
    console.log(this.resons)
    return this.resons;
  }

  setReasons(data: any){
    this.resons = data;
    console.log(this.resons)

  }

  clearData() {
    this.complaintData = {
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
    console.log('Datos reiniciados en ComplaintDataService');
  }
}
