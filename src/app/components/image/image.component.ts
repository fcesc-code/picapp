import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
})
export class ImageComponent implements OnInit {
  image!: Image;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    const identifier = String(this.activatedRoute.snapshot.paramMap.get('id'));

    this.imagesService.getImageById(identifier).subscribe((image) => {
      if (!image) {
        return this.router.navigateByUrl('/');
      }

      this.image = image;
      return;
    });
  }
}
