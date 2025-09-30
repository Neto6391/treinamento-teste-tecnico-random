import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  it('should create', () => {
    expect(new TasksComponent({} as any)).toBeTruthy(); // vai falhar: construtor exige TasksService real
  });
});
