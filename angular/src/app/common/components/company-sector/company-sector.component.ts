import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '@proxy/commons';
import { CompanyService } from '@proxy/companies';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-company-sector',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    ListboxModule
  ],
  templateUrl: './company-sector.component.html',
  styleUrl: './company-sector.component.scss'
})
export class CompanySectorComponent {
  @Output() dataEvent = new EventEmitter<any[]>();
  @Input() sectorIDFromParent: number;
  @Input() lastsectorIDFromParent: number;
  sectorID: number = 0;
  lastsectorID: number = this.sectorID;
  stockMarketID:number;
  markets = [];
  marketSectors = [];
  companies = [];

  constructor(private commonService: CommonService,private companyService: CompanyService ) {}

  ngOnInit() {
    this.getCompStockMarkets();
    this.sectorID = this.sectorIDFromParent;
    // this.lastsectorID = this.lastsectorIDFromParent;
    // this.stockMarketID = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
      debugger;
      this.lastsectorIDFromParent =   changes.lastsectorIDFromParent.currentValue;
    
}

  onListBoxSelectionChange(event: any) {
    debugger;
    if(this.sectorID == null)
      this.sectorID = this.lastsectorIDFromParent;
    else
    this.lastsectorIDFromParent = this.sectorID;
  }

  getCompStockMarkets() {
    this.commonService.getCompStockMarkets().subscribe(res => {
      this.markets = res;
      if (this.markets.length > 0) this.stockMarketID = this.markets[0].stockMarketID; this.fillCompByMarketId();
    });
  }

  fillCompByMarketId() {
    this.commonService.getCompMSectorsByMarketID(this.stockMarketID).subscribe(res => {
      debugger;
      this.marketSectors = res.marketSectors;
      if (this.marketSectors.length > 0) this.sectorID = this.marketSectors[0].sectorID; this.getCompanies();
    });
  }

  getCompanies() {
    this.companyService
      .getCompaniesBySectorIDAndStockMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        debugger;
        this.companies = res;
        if (this.companies.length > 0) this.sendDataToParent();
      });
  }

  sendDataToParent() {
    this.dataEvent.emit(this.companies);
}
}
