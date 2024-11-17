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
      this.complaintData = { ...this.complaintData, ...this.complainant };
  }

  setId(id: number){
    this.complaintData.Id = id;
  }

  getId(): number{
    return this.complaintData.Id;
  }

  setDenunciante(data: any){
    this.complainant = data;
  }

  getDenunciante(){
    return this.complainant;
  }

  getComplaintData() {
    return this.complaintData;
  }

  getReasons(){
    return this.resons;
  }

  setReasons(data: any){
    this.resons = [...data];
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
  }
}
