import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { Comments } from '../validate/validate';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[

    trigger('comments', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),

          ]))]),{optional: true}),

      
            query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
  
            ]))]),{optional: true}),
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = `Add comment`;
  nameText: string = ``;
  commentText: string = ``;
  comments = [];
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.getComments()
    .subscribe((data: any) => {
     //alert(JSON.stringify(data.users));
     //console.log(JSON.stringify(data.users));

      this.comments = data.users;
      this._data.changeComments(this.comments);
    }); setTimeout(() => {
      this.itemCount = this.comments.length;
      this._data.comment.subscribe(res=> this.comments = res);
      this._data.changeComments(this.comments);
    }, 2000);
    
  } 


  addItem(){

    if(Comments(this.nameText,this.commentText)){
      var payload = {
        name : this.nameText,
        email : "leonardo.m2349@gmail.com",
        age: "21",
        comments: this.commentText
      }
  
  
      this._data.postComment(payload)
      .subscribe((data: any) => {
     
        this.comments.push(payload);
        this.nameText='';
        this.commentText='';
        this.itemCount=this.comments.length;
        this._data.changeComments(this.comments);
  
     });
     setTimeout(() => {
       alert(`¡${this.nameText} your comment was successful!`);
    }, 2500);
    }

    if(!Comments(this.nameText,this.commentText)){
      alert(`Please check your information!`);
    }

    

   

   
  }
  removeItem(i){
    this.comments.splice(i,  1); 
    this._data.changeComments(this.comments); 
     
  } 
}
