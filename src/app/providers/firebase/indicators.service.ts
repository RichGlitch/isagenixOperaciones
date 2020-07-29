import { Injectable } from '@angular/core';
import { indicatorsList, Indicators } from '../../models/indicator.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {
  
  public indicatorsList: Indicators[] = indicatorsList;

  constructor(private firestore: AngularFirestore) { }

  getIndicators(){
    return this.firestore.collection('Indicators').valueChanges();
    //return this.indicatorsList;
  }

  public saveIndicatorsList(){
    this.indicatorsList.forEach(
      indicator => {
        this.saveIndicator(indicator);
      }
    )
  }
  
  public saveIndicator(indicator: Indicators){
    console.log('saving indicator');
    console.log(indicator);
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`Indicators/${indicator.Id}`);
    return userRef.set(indicator,{merge:true});
  }
}
