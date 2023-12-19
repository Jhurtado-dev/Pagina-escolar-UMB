import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionModel } from 'src/models/session.model';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private http: HttpClient) { }

  private basePath = `${environment.host}/api/reports`;
  private fomulation = `/formulation`;
  private prewet = `/prewet`;
  private bunker = `/bunker`;
  private sowing = `/sowing`;
  private tunnels = `/tunnels`;
  private bedsheetHouse = `/bedsheet/houses`;
  private weekHouses = `/week/houses`;
  private laboratory = `/laboratory`;
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private idPlant = this.sessionData.user.data.id_plant;
  private httpOptions = {
    headers: new HttpHeaders({
      auth: this.sessionData.token
    })
  };

  // FORMULATIONS

  getAllBatches(startsDate: string, endDate: string) {
    return this.http.get(`${this.basePath}${this.fomulation}/batches/getAll/${this.idPlant}&${startsDate}&${endDate}`, this.httpOptions);
  }
  
  getAllBatchesIndicators(idBatch: string) {
    return this.http.get(`${this.basePath}${this.fomulation}/indicators/getAll/${this.idPlant}&${idBatch}`, this.httpOptions);
  }

  getAllBatchMaterial(batchKey: string) {
    return this.http.get(`${this.basePath}${this.fomulation}/materialsType/getAll/${batchKey}`, this.httpOptions);
  }

  getAllBatchMaterialType(batchKey: string, materialType: string) {
    return this.http.get(`${this.basePath}${this.fomulation}/materialsType/getAllType/${batchKey}&${materialType}`, this.httpOptions);
  }

  // PREWETS

  getAllWaterPrewet(batchKey: string) {
    return this.http.get(`${this.basePath}${this.prewet}/water/getAll/${batchKey}`, this.httpOptions);
  }
  
  getAllWaterWeeklyPrewet(initialDate: string, finalDate: string) {
    return this.http.get(`${this.basePath}${this.prewet}/weekly/getAll/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }
  
  getOnePrewet(idBatch) {
    return this.http.get(`${this.basePath}${this.prewet}/getOne/${this.idPlant}&${idBatch}`)
  }
  
  // BUNKERS
  
  getAllBunkersfill(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bunker}/getAll/${batchKey}`, this.httpOptions);
  }
  
  getAllBunkersWeeklyFill(initialDate: string, finalDate: string) {
    return this.http.get(`${this.basePath}${this.bunker}/weekly/getAll/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  // TUNNELS

  getAllTunnels(batchKey: string) {
    return this.http.get(`${this.basePath}${this.tunnels}/getAll/${this.idPlant}&${batchKey}`, this.httpOptions);
  }
  
  getAllTunnelsWeeklyFill(initialDate: string, finalDate: string) {
    return this.http.get(`${this.basePath}${this.tunnels}/weekly/getAll/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getAllPasteurization(batchKey: string) {
    return this.http.get(`${this.basePath}${this.tunnels}/pasteurization/getAll/${batchKey}`, this.httpOptions);
  }

  // SOWING

  getAllSowing(batchKey: string) {
    return this.http.get(`${this.basePath}${this.sowing}/getAll/${batchKey}`, this.httpOptions);
  }

  getAllSowingWeeklyFill(initialDate: string, finalDate: string) {
    return this.http.get(`${this.basePath}${this.sowing}/weekly/getAll/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getAllSowingDetails(batchKey: string) {
    return this.http.get(`${this.basePath}${this.sowing}/details/getAll/${batchKey}`, this.httpOptions);
  }
  
  getAllSowingsDetailsWeekly(initialDate: string, finalDate: string) {
    return this.http.get(`${this.basePath}${this.sowing}/details/weekly/getAll/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getAllSowingMaterialSubtype(batchKey: string) {
    return this.http.get(`${this.basePath}${this.sowing}/lots/getAll/${batchKey}`, this.httpOptions);
  }

  getAllSowingDetailsDay4(batchKey: string) {
    return this.http.get(`${this.basePath}${this.sowing}/details/getAllDay/${batchKey}`, this.httpOptions);
  }

  getAllSowingDetailsDay4Instruction(batchKey: string) {
    return this.http.get(`${this.basePath}${this.sowing}/instruction/getAllDay/${batchKey}`, this.httpOptions);
  }

  //Bedsheet
  getAllBatchesBedsheet(startsDate: string, endDate: string, plant: string) {
    return this.http.get(`${this.basePath}${this.fomulation}/batches/getAll/${plant}&${startsDate}&${endDate}`, this.httpOptions);
  }
  
  getAllBatchesIndicatorsBedsheet(idBatch: string, plant: string) {
    return this.http.get(`${this.basePath}${this.fomulation}/indicators/getAll/${plant}&${idBatch}`, this.httpOptions);
  }

  getAllTunnelsBedsheet(batchKey: string, plant: string) {
    return this.http.get(`${this.basePath}${this.tunnels}/getAll/${plant}&${batchKey}`, this.httpOptions);
  }

  //Houses
  getAllHouses(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getAll/${batchKey}`, this.httpOptions);
  }
  getAllHousesQuestions(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getAllQuestions/${batchKey}`, this.httpOptions);
  }
  getHouseIncubation(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getHouseIncubation/${batchKey}`, this.httpOptions);
  }

  getHouseCover(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getHouseCover/${batchKey}`, this.httpOptions);
  }

  getHouseSwept(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getHouseSwept/${batchKey}`, this.httpOptions);
  }

  getHouseCut(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getHouseCut/${batchKey}`, this.httpOptions);
  }

  getHouseEmptied(batchKey: string) {
    return this.http.get(`${this.basePath}${this.bedsheetHouse}/getHouseEmptied/${batchKey}`, this.httpOptions);
  }


  //Weekly houses
  getWeekHouseSeeds(idHouse: number, idPlant: string ,processDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllSeeds/${idHouse}&${idPlant}&${processDate}`, this.httpOptions);
  }

  getWeekHousesFill(initialDate: string, finalDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllHouseFill/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getWeekHousesIncubation(initialDate: string, finalDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllHouseIncubation/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getWeekHousesCover(initialDate: string, finalDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllHouseCover/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getWeekHousesSwept(initialDate: string, finalDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllHouseSwept/${this.idPlant}&${initialDate}&${finalDate}`, this.httpOptions);
  }

  getWeekHousesCut(initialDate: string, finalDate: string, dayStart: number, dayEnd: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllHousesCut/${this.idPlant}&${initialDate}&${finalDate}&${dayStart}&${dayEnd}`, this.httpOptions);
  }

  getWeekFillDetails(id_house: any, id_plant: any, process_date: any){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllByFill/${id_house}&${id_plant}&${process_date}`, this.httpOptions);
  }

  getWeekIncubationDetails(id_house: any, id_plant: any, process_date: any){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllByIncubation/${id_house}&${id_plant}&${process_date}`, this.httpOptions);
  }

  getWeekCoverDetails(id_house: any, id_plant: any, process_date: any){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllByCover/${id_house}&${id_plant}&${process_date}`, this.httpOptions);
  }

  getWeekSweptDetails(id_house: any, id_plant: any, process_date: any){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllBySwept/${id_house}&${id_plant}&${process_date}`, this.httpOptions);
  }

  getWeekCutProduction(idHouse: number, idPlant: number, processDate: string, day: number, dayEnd: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllCutProduction/${idHouse}&${idPlant}&${processDate}&${day}&${dayEnd}`, this.httpOptions);
  }

  getWeekCutDiseases(idHouse: number, idPlant: number, processDate: string, initialDay: number, finalDay: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllCutDiseases/${idHouse}&${idPlant}&${processDate}&${initialDay}&${finalDay}`, this.httpOptions);
  }

  getWeekIncubationDiseases(idHouse: number, processDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllIncubationDiseases/${idHouse}&${processDate}`, this.httpOptions);
  }

  getWeekSweptDiseases(idHouse: number, processDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllSweptDiseases/${idHouse}&${processDate}`, this.httpOptions);
  }

  getWeekCutPlagues(idHouse: number, idPlant: number, processDate: string, initialDay: number, finalDay: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllCutPlagues/${idHouse}&${idPlant}&${processDate}&${initialDay}&${finalDay}`, this.httpOptions);
  }
  
  getWeekCutWateringBeds(idHouse: number, idPlant: number, processDate: string, initialDay: number, finalDay: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllCutWateringBeds/${idHouse}&${idPlant}&${processDate}&${initialDay}&${finalDay}`, this.httpOptions);
  }
  
  getWeekCutWateringFloors(idHouse: number, idPlant: number, processDate: string, initialDay: number, finalDay: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getAllCutWateringFloors/${idHouse}&${idPlant}&${processDate}&${initialDay}&${finalDay}`, this.httpOptions);
  }

  getDensity(idHouse: number, processDate: string, initialRange: number, finalRange: number){
    return this.http.get(`${this.basePath}${this.weekHouses}/getDensityOutbreak/${idHouse}&${this.idPlant}&${processDate}&${initialRange}&${finalRange}`, this.httpOptions);
  }

  getCoverGround(idHouse: number, processDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getCoverGround/${idHouse}&${this.idPlant}&${processDate}`, this.httpOptions);
  }

  getFinishedHouses(initialDate: string, finalDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getFinishedHouses/${initialDate}&${finalDate}&${this.idPlant}`, this.httpOptions);
  }

  getEmptiedHouses(idHouse: number, processDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getEmptiedHouses/${idHouse}&${processDate}`, this.httpOptions);
  }

  getBurnedHouses(idHouse: number, processDate: string){
    return this.http.get(`${this.basePath}${this.weekHouses}/getBurnedHouses/${idHouse}&${processDate}`, this.httpOptions);
  }

  //Laboratory
  getRawMaterialsLaboratory(idMaterialType: number, idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}/rawMaterials/${idMaterialType}&${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }
  getBunkersLaboratory(idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}/bunkers/${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }
  getTunnelsLaboratory(idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}/tunnels/${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }
  getSowingLaboratory(idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}/sowing/${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }
  getIncubationLaboratory(idPlant: any, startDate: string, endDate: string, startDay: number, endDay: number){
    return this.http.get(`${this.basePath}${this.laboratory}/incubation/${idPlant}&${startDate}&${endDate}&${startDay}&${endDay}`,this.httpOptions);
  }
  getCoverLaboratory(idPlant: any, startDate: string, endDate: string, startDay: number, endDay: number){
    return this.http.get(`${this.basePath}${this.laboratory}/cover/${idPlant}&${startDate}&${endDate}&${startDay}&${endDay}`,this.httpOptions);
  }
  getCutDensityLaboratory(idPlant: any, startDate: string, endDate: string, startDay: number, endDay: number){
    return this.http.get(`${this.basePath}${this.laboratory}/cutDensity/${idPlant}&${startDate}&${endDate}&${startDay}&${endDay}`,this.httpOptions);
  }

  //Sábana laboratorio
  //Laboratory
  getBedsheetBatchesLaboratory(idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}bedsheet/batches/${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }

  getBedsheetMaterialsLaboratory(batch: any, idPlant: any){
    return this.http.get(`${this.basePath}${this.laboratory}/bedsheet/materials/${batch}&${idPlant}`,this.httpOptions);
  }
  getBedsheetBunkersLaboratory(batch: any, idPlant: any){
    return this.http.get(`${this.basePath}${this.laboratory}/bedsheet/bunkers/${batch}&${idPlant}`,this.httpOptions);
  }
  /*getTunnelsLaboratory(idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}/tunnels/${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }
  getSowingLaboratory(idPlant: any, startDate: string, endDate: string){
    return this.http.get(`${this.basePath}${this.laboratory}/sowing/${idPlant}&${startDate}&${endDate}`,this.httpOptions);
  }
  getIncubationLaboratory(idPlant: any, startDate: string, endDate: string, startDay: number, endDay: number){
    return this.http.get(`${this.basePath}${this.laboratory}/incubation/${idPlant}&${startDate}&${endDate}&${startDay}&${endDay}`,this.httpOptions);
  }
  getCoverLaboratory(idPlant: any, startDate: string, endDate: string, startDay: number, endDay: number){
    return this.http.get(`${this.basePath}${this.laboratory}/cover/${idPlant}&${startDate}&${endDate}&${startDay}&${endDay}`,this.httpOptions);
  }
  getCutDensityLaboratory(idPlant: any, startDate: string, endDate: string, startDay: number, endDay: number){
    return this.http.get(`${this.basePath}${this.laboratory}/cutDensity/${idPlant}&${startDate}&${endDate}&${startDay}&${endDay}`,this.httpOptions);
  }*/
}
