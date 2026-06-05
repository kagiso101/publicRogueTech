import { Component } from '@angular/core';

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
  processSteps: ProcessStep[] = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'Free consultation to understand your business, goals, and the right package fit. No commitment.',
    },
    {
      num: '02',
      title: 'Design',
      desc: 'We present designs for your approval before any development begins. No surprises later.',
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Development with regular updates and milestone approvals through your project space.',
    },
    {
      num: '04',
      title: 'Launch & Own',
      desc: 'We deploy, configure, and hand over full ownership. Optional support plans available.',
    },
  ];
}