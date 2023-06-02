import { HttpClient, HttpResponse } from '@angular/common/http';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';

import {TestBed} from '@angular/core/testing';
import { ScrapbookService } from './content-scrapbook.service';
import { Scrapbook } from '../dataaccess/scrapbook';

describe('DepartmentService', () => {
  let service: ScrapbookService;
  let httpSpy: Spy<HttpClient>;

  const fakeDepartments: Scrapbook[] = [
    {
      id: 1,
      rating: 3,
      title: 'Test2'
    },
    {
      id: 2,
      rating: 5,
      title: 'TestScrapbook'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ]
    });
    service = TestBed.inject(ScrapbookService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of scrapbooks', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeDepartments);

    service.getList().subscribe({
        next:
          scrapbooks => {
            expect(scrapbooks).toHaveSize(fakeDepartments.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new scrapbook', (done: DoneFn) => {

    const newScrapbook: Scrapbook = {
      id: 3,
      rating: 2,
      title: 'Scrapbook 3'
    };

    httpSpy.post.and.nextWith(newScrapbook);

    service.save(newScrapbook).subscribe({
        next: department => {
          expect(department).toEqual(newScrapbook);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an scrapbook', (done: DoneFn) => {

    const scrapbook = fakeDepartments[0];
    scrapbook.title = 'Updated Department';

    httpSpy.put.and.nextWith(scrapbook);

    service.update(scrapbook).subscribe({
      next: department => {
        expect(department.title).toEqual('Updated Scrapbook');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing department', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
