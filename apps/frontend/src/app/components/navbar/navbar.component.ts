import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menu = viewChild<ElementRef<HTMLElement>>("navbarBasicExample")

  toggle(e:Event){

    const burger = e.currentTarget as Element
    const menu = this.menu()!.nativeElement as HTMLElement

    if(menu){
      menu.classList.toggle("is-active")
      burger.classList.toggle("is-active")
    }
  }

}
