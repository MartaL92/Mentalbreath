import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private authSrv: AuthService) { }

  url = "http://localhost:4201/users";
  urlMock: string = "https://639f59035eb8889197fad332.mockapi.io/groups";
  groups: Group[] = [];

  getGroups(){
    return this.http.get<Group[]>(`${this.urlMock}`)
  }

  getGroupsJoin(id: number){
    return this.http.get(`${this.urlMock}/` + id)
  }

  addGroup(form:any){
    let data = {
      title: form.title,
      theme: form.theme,
      place: form.place,
      city: form.city,
      start: form.start,
      nrUsers: form.nrUsers,
      description: form.description,
      professional: localStorage.getItem('userID')
    }
    return this.http.post<Group>(`${this.urlMock}`, data)
  }

  getGroup(id: number){
    return this.http.get<Group>(`${this.urlMock}/` + id)
  }

  updateEntry(id:number, groupEntry: any){
    let data = {
      entry: groupEntry
    }
    return this.http.put(`${this.urlMock}/` + id, data)
  }

  getProfessional(id: number){
    return this.http.get(`${this.url}/` + id)
  }

  getMyData(){
    return this.http.get(`${this.url}/` + localStorage.getItem('userID'))
  }

  editUser(id: number, data: any){
    return this.http.patch(`${this.url}/` + id, data)
  }

  getMyGroup(){
  return this.http.get<Group[]>(`${this.urlMock}?professional=` + localStorage.getItem('userID'))
  }

  deleteGroup(id:number) {
    return this.http.delete(`${this.urlMock}/` + id)
  }

  deleteUser(id:number){
    return this.http.delete(`${this.url}/` + id)
  }

  addJoin(id: number){
    let data = {
      groupsID: []
    }
    return this.http.patch(`${this.url}/` + id, data)
  }

  getToJoin(id: number){
    return this.http.get(`${this.url}/` + id)
  }

  joinGroup(consID: number, groupTo: any){
    let data = {
      groupsID: groupTo
    }
    return this.http.patch(`${this.url}/` + consID, data)
  }



}
