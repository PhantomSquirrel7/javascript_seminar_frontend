import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@app/services/swagger-api/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@app/components';
import { MatDialog } from '@angular/material/dialog';


export interface MeetingData {
  date: string;
  duration: string;
  groupAssignment: string;
}

@Component({
  selector: 'app-student-meetings-content',
  templateUrl: './student-meetings-content.component.html',
  styleUrls: ['./student-meetings-content.component.less'],
})
export class StudentMeetingsContentComponent implements OnInit {
  displayedColumns: string[] = ['Date','Duration', 'Group Assignment Type', 'Join Button'];
  dataSource: MatTableDataSource<MeetingData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private _snackBar: MatSnackBar,
    private user2Service: UserService,
    public dialog: MatDialog,
  ) {}

  loading = false;
  joinMeetingLoading = false;
  error: string;
  meetings = null;
  selectedMeetingId = null;
  isJoinedToMeeting = false;
  selectedMeeting = null;

  ngOnInit() {
    this.loading = true;
    this.user2Service
      .meMeetingsGet()
      .toPromise()
      .then((response) => {
        this.meetings = response;
        this.dataSource = new MatTableDataSource(this.meetings);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 0);        
        this.loading = false;
      })
      .catch((error) => {
        this.error = error;
        this._snackBar.open(this.error, 'Close', {
          duration: 3000,
        });
        this.loading = false;
        this.meetings = null;
      });
  }

  openJoinMeetingDialogBox(meetingId){

    const message = `Are you sure you want to join to meeting ?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) this.joinMeeting(meetingId);
    });
  }

  joinMeeting(meetingId) : void {
    this.joinMeetingLoading = true;
    this.user2Service.meMeetingsMeetingIdGet(meetingId).toPromise().then(response => {
      this.selectedMeeting = response;
      this.isJoinedToMeeting = true;
      this.joinMeetingLoading = false;
      this._snackBar.open('You Joined Meeting!', 'Close', {
        duration: 3000,
      });      
    }).catch(error => {
      this.error = error;
      this.isJoinedToMeeting = false; 
      this.joinMeetingLoading = false;
      this._snackBar.open(this.error, 'Close', {
        duration: 3000,
      });
    })

  }

  returnMeetingList(){
    this.isJoinedToMeeting = false; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

}
