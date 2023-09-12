import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { experiencePoints: number }, private router: Router, private dialogRef: MatDialogRef<ModalWindowComponent> ) {}

  @HostListener('document:keydown.escape', ['$event']) // Listen for the "Escape" key press
  onKeydownHandler(event: KeyboardEvent) {
    this.resetGame();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if the click event occurred outside of the modal
    this.resetGame()
  }

  resetGame() {
    this.dialogRef.close();
    this.router.navigate(['/modes']);
  }

}
