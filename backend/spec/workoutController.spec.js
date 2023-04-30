const { createWorkout } = require('../controllers/workoutController');
const Workout = require('../models/workoutModel');

describe('Workout Controller', () => {
  describe('createWorkout', () => {
    beforeEach(() => {
      // Mock the user object
      req = {
        user: {
          _id: 'testUserId',
        },
        body: {
          title: 'Test Workout',
          load: 50,
          reps: 10,
        },
      };

      // Mock the response object
      res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
      };
    });

    // Test case: successfully create a new workout
    it('should create a new workout and return 200 status code', async () => {
      // Mock the Workout.create method to return a test workout
      spyOn(Workout, 'create').and.returnValue({
        _id: 'testWorkoutId',
        title: 'Test Workout',
        load: 50,
        reps: 10,
        user_id: 'testUserId',
      });

      // Call the createWorkout function with the mocked request and response objects
      await createWorkout(req, res);

      // Check if the response has a status code of 200 and the expected workout data
      expect(res.statusCode).toEqual(200);
      expect(res.data).toEqual({
        _id: 'testWorkoutId',
        title: 'Test Workout',
        load: 50,
        reps: 10,
        user_id: 'testUserId',
      });
    });

    // Test case: required fields are missing
    it('should return 400 status code when required fields are missing', async () => {
      // Set the required fields to empty values
      req.body.title = '';
      req.body.load = '';

      // Call the createWorkout function with the mocked request and response objects
      await createWorkout(req, res);

      // Check if the response has a status code of 400 and the expected error data
      expect(res.statusCode).toEqual(400);
      expect(res.data).toEqual({
        error: 'Please fill in all the fields',
        emptyFields: ['title', 'load'],
      });
    });

    // Test case: database error occurs
    it('should return 400 status code when database error occurs', async () => {
      // Mock the Workout.create method to throw a test error
      spyOn(Workout, 'create').and.throwError('Test database error');

      // Call the createWorkout function with the mocked request and response objects
      await createWorkout(req, res);

      // Check if the response has a status code of 400 and the expected error data
      expect(res.statusCode).toEqual(400);
      expect(res.data).toEqual({
        error: 'Test database error',
      });
    });
  });
});
