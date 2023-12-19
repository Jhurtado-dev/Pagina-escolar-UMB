import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogComponent } from './blog/blog.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    BlogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LandingModule { }
