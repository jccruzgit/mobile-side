import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService, private router: Router,
    private menu: MenuController) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
     this.menu.enable(true);
  }

  logOut(){
   this.authService.logOut().subscribe(data => {
     this.router.navigate(['/login']);
   },err => {
   });
 }

}
