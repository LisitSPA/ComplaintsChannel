import { Component } from '@angular/core';
import { TranslateService } from '../services/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {
  selectedLanguage: string = 'es';  
  translatedText: string = ''; 

  constructor(private translatorService: TranslateService) {}

  translatePage() {
    const bodyText = document.body.innerText;  

    this.translatorService.translateText(this.selectedLanguage, bodyText).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response); 

        if (response && response.content) {
          console.log('Contenido traducido:', response.content); 
          this.replaceText(response.content[0]);  
        } else {
          console.warn('No se encontró contenido en la respuesta.');
        }
      },
      (error) => {
        console.error('Error en la traducción:', error);
      }
    );
  }

  replaceText(translatedText: string) {
    document.body.innerText = translatedText;
  }
}
