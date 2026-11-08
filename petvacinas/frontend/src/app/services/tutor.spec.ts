
import { TestBed } from '@angular/core/testing';
import { TutorService } from './tutor';

describe('TutorService', () => {
  let service: TutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorService]
    });

    service = TestBed.inject(TutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
