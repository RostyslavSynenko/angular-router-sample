import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(params.get('id'))
      )
    );

    /*
    the no-observable alternative
    
    const id = this.route.snapshot.paramMap.get('id');

    this.hero$ = this.heroService.getHero(id);
    */
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;

    this.router.navigate(['/superheroes', { id: heroId }]);
  }
}
