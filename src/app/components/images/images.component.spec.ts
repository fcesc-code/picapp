import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImagesComponent } from './images.component';

import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';
import { of } from 'rxjs';

describe('COMPONENTS: ImagesComponent suite', () => {
  class TemporalComponentForRoutes {}
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;
  const tested = '[images component]';
  const mockImageId = 'someImageId';
  const mockRoute = 'image';
  const mockImagesList: Image[] = [
    {
      id: 'someId',
      author: 'someAuthor',
      width: 450,
      height: 300,
      url: 'someUrl',
      download_url: 'someDownloadUrl',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: `${mockRoute}/${mockImageId}`,
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [ImagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST1: Component created
  it(`${tested} > should create`, () => {
    expect(component).toBeTruthy();
  });

  // TEST2: method load images
  it(`${tested} > should load images`, () => {
    const imagesService = fixture.debugElement.injector.get(ImagesService);
    const spy = spyOn(imagesService, 'getAllImages').and.returnValue(
      of(mockImagesList)
    );

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.images).toEqual(mockImagesList);
  });
});
