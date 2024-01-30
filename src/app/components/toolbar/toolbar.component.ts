import { Component, HostListener } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  installPrompt: any = null;

  async onInstallPWA() {
    if (!this.installPrompt) {
      return;
    }
    const result = await this.installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.installPrompt = event;
    });
  }
}
