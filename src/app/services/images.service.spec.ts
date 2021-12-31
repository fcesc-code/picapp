import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ImagesService } from './images.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Image } from '../models/image.interface';

describe('SERVICES: imagesService suite', () => {
  let service: ImagesService;
  let httpMock: HttpTestingController;
  const tested = '[images service]';
  const API = {
    protocol: 'https://',
    host: 'picsum.photos',
    pathAll: '/v2/list',
    pathSingle: '/id/',
    suffixSingle: '/info',
  };
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImagesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(ImagesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // TEST1: service is created
  it(`${tested} > should be created`, () => {
    expect(service).toBeTruthy();
  });

  // TEST2: getAllImages method
  it(`${tested} method: getAllImages > is called with GET method and returns a list of Images`, () => {
    service.getAllImages().subscribe((images: Image[]) => {
      expect(images).toEqual(mockImagesList);
    });
    const req = httpMock.expectOne(`${API.protocol}${API.host}${API.pathAll}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImagesList);
  });

  // TEST3: getImageById method
  it(`${tested} method: getImageById > is called with GET method and returns an Image`, () => {
    const mockImageId = 'someId';
    service.getImageById(mockImageId).subscribe((image: Image) => {
      expect(image).toEqual(mockImagesList[0]);
    });
    const req = httpMock.expectOne(
      `${API.protocol}${API.host}${API.pathSingle}${mockImageId}${API.suffixSingle}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockImagesList[0]);
  });
});
