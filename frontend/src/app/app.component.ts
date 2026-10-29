import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CalculatorApiService } from './services/calculator-api.service';
import { CalculationResponse, Operation } from './models/calculation.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="page">
      <section class="calculator" aria-labelledby="title">
        <p class="eyebrow">A simple tool for everyday math</p>
        <h1 id="title">Calculator</h1>
        <p class="intro">Choose an operation and enter your numbers.</p>
        <form (ngSubmit)="submit()">
          <label for="first">First number</label>
          <input id="first" name="first" type="number" step="any" [(ngModel)]="firstNumber" required>
          <label for="operation">Operation</label>
          <select id="operation" name="operation" [(ngModel)]="operation">
            <option value="+">Add (+)</option><option value="-">Subtract (−)</option>
            <option value="*">Multiply (×)</option><option value="/">Divide (÷)</option>
          </select>
          <label for="second">Second number</label>
          <input id="second" name="second" type="number" step="any" [(ngModel)]="secondNumber" required>
          <button type="submit" [disabled]="loading">{{ loading ? 'Calculating…' : 'Calculate' }}</button>
        </form>
        @if (result !== null) {
          <div class="result" role="status"><span>Result</span><strong>{{ result.result }}</strong></div>
        }
        @if (error) { <p class="error" role="alert">{{ error }}</p> }
      </section>
      <footer>Powered by FastAPI</footer>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly calculator = inject(CalculatorApiService);
  firstNumber = 0;
  secondNumber = 0;
  operation: Operation = '+';
  result: CalculationResponse | null = null;
  error = '';
  loading = false;

  submit(): void {
    this.loading = true;
    this.error = '';
    this.result = null;
    this.calculator.calculate({
      first_number: Number(this.firstNumber),
      second_number: Number(this.secondNumber),
      operation: this.operation
    }).subscribe({
      next: (result) => { this.result = result; this.loading = false; },
      error: (error: HttpErrorResponse) => {
        this.error = error.error?.detail ?? 'Could not reach the calculator API. Check that the backend is running.';
        this.loading = false;
      }
    });
  }
}
