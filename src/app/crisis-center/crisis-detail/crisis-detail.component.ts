import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Crisis } from '../crisis';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (
      !this.crisis ||
      this.crisis.name === this.editName
    ) {
      return true;
    }

    return this.dialogService.confirm('Discard changes?');
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;

    this.router.navigate(['../', { id: crisisId }], {
      relativeTo: this.route
    });
  }
}
