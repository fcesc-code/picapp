import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('COMPONENTS: ImageComponent suite', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  const tested = '[image component]';
  const mockImageId = 'someImageId';
  const mockRoute = 'image';
  const mockImage: Image = {
    id: 'someId',
    author: 'someAuthor',
    width: 450,
    height: 300,
    url: 'someUrl',
    download_url: 'someDownloadUrl',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST1: Component created
  it(`${tested} > should create`, () => {
    expect(component).toBeTruthy();
  });

  // TEST2: method get image by id
  it(`${tested} > should load image by a given id`, () => {
    const imagesService = fixture.debugElement.injector.get(ImagesService);
    const spy = spyOn(imagesService, 'getImageById').and.returnValue(
      of(mockImage)
    );

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.image).toEqual(mockImage);
  });
});
