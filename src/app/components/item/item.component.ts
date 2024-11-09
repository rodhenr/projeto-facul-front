import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() modelo!: string;
  @Input() categoria!: string;
  @Input() img!: string;
  @Input() img2!: string;
  @Input() id!: string;
  @Input() fabricante!: string;
  @Input() name!: string;
  @Input() pathName!: string;
  @Input() pPrazo!: number;
  @Input() garantia!: string;
  @Input() specs!: object[];
  @Input() promo!: boolean;
}
