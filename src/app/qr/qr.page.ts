import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  result= null;
  scanActive=false;

  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy(): void {
    BarcodeScanner.stopScan();
  }

  async startScanner(){
    const allowed = await this.checkPermission();
    if(allowed){
      this.scanActive=true;
      const result = await BarcodeScanner.startScan();
      if(result.hasContent){
        this.router.navigateByUrl('/result/' + result.content);
        this.scanActive = false;
      }
    }
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({force:true});
    if (status.granted){
      resolve(true);
    }else if(status.denied){
      const alert = await this.alertController.create({
        header:'No permission',
        message:'Please allow camera access in your settings',
        buttons:[{
          text:'NO',
          role:'cancel'
        },{
          text:'Open Settings',
          handler:()=>{
            resolve(false);
            BarcodeScanner.openAppSettings();
          }
        }]
      });
      await alert.present();
    }else{
      resolve(false);
    }
    });
  }

  stopScanner(){
    BarcodeScanner.stopScan();
    this.scanActive=false;
  }
}
