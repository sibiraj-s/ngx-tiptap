import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private routerSubscription!: Subscription

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) { }

  private getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  ngOnInit(): void {
    const defaultTitle = this.title.getTitle()

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.getChild(this.activatedRoute)

      route.data.subscribe(data => {
        const dataTitle = data['title']

        const title = dataTitle ? dataTitle + ' | NgxTiptap' : defaultTitle
        this.title.setTitle(title)
      })
    })
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
  }
}
