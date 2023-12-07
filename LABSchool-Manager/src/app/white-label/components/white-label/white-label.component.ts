import { Component, OnInit } from '@angular/core';
import { WhiteLabelService } from '../../../services/whiteLabel.service';

@Component({
  selector: 'app-white-label',
  templateUrl: './white-label.component.html',
  styleUrls: ['./white-label.component.scss']
})
export class WhiteLabelComponent implements OnInit {
  whiteLabels: any[] = [];
  selectedWhiteLabel: any = null;
  formMode: 'create' | 'update' = 'create';

  constructor(private whiteLabelService: WhiteLabelService) { }

  ngOnInit(): void {
    this.loadWhiteLabels();
  }

  getColorsArray(colors: string): string[] {
    return colors.split(',').map(color => color.trim());
 }


  loadWhiteLabels(): void {
    this.whiteLabelService.getAllWhiteLabels().subscribe(response => {
      this.whiteLabels = response;
    });
  }

  selectWhiteLabel(whiteLabel: any): void {
    this.selectedWhiteLabel = { ...whiteLabel };
    this.formMode = 'update';
  }
}