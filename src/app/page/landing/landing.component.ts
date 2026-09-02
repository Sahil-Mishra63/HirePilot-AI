import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {

    const element = this.elementRef.nativeElement;

    // hero

    const heroTimeline = gsap.timeline();

    heroTimeline
      .from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.4')
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
      // .from('.hero-button', {
      //   y: 20,
      //   opacity: 0,
      //   duration: 0.6,
      //   ease: 'power3.out'
      // }, '-=0.4');


    // works

    gsap.from('.section-heading', {

      scrollTrigger: {
        trigger: '.how-it-works',
        start: 'top 70%',
      },

      y: 60,
      opacity: 0,

      duration: 1,

      ease: 'power3.out'

    });


    // cards

    gsap.from('.card', {

      scrollTrigger: {
        trigger: '.cards',
        start: 'top 75%',
      },

      y: 80,
      opacity: 0,

      duration: 0.8,

      stagger: 0.15,

      ease: 'power3.out'

    });


    // features

    gsap.from('.features h2', {

      scrollTrigger: {
        trigger: '.features',
        start: 'top 70%',
      },

      scale: 0.7,
      opacity: 0,

      duration: 1,

      ease: 'back.out(1.7)'

    });

    gsap.to('.hero-glow', {

    x: 200,
    y: 100,

    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }

  });

  gsap.from('.cta-content', {

      scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 70%',
      },

      y: 80,
      opacity: 0,

      duration: 1.2,

      ease: 'power3.out'

  });

  gsap.to('.cta-glow-one', {

    x: 100,
    y: 50,

    duration: 5,

    repeat: -1,
    yoyo: true,

    ease: 'sine.inOut'

});

gsap.to('.cta-glow-two', {

      x: -100,
      y: -50,

      duration: 6,

      repeat: -1,
      yoyo: true,

      ease: 'sine.inOut'

  });


  }

}
